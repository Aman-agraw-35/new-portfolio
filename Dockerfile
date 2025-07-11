# ⚡ Stage 1: Build the project
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN npm install

# Copy all project files
COPY . .

# Ensure Tailwind processes styles correctly
RUN npx tailwindcss -c /app/tailwind.config.ts -i /app/client/src/index.css -o /app/client/src/output.css

# Build the project (assumes Vite for frontend)
RUN npm run build

# ⚡ Stage 2: Production setup
FROM node:18-alpine

WORKDIR /app

# Copy only necessary built files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/client/dist ./client/dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose required ports
EXPOSE 80 3000

# Set environment variables (for testing; use .env in production)
ENV NODE_ENV=production
ENV MONGODB_URI=mongodb+srv://ghost:ghostishere@cluster0.llqvm.mongodb.net/

# Start the application (use correct script for Vite or Express)
CMD ["npm", "run", "start"]
