# ⚡ Stage 1: Build the project
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN npm install

# Copy all files
COPY . .

# Ensure Tailwind processes styles correctly before build
RUN cd client && npx tailwindcss -i ./src/index.css -o ./src/output.css

# Build the project
RUN npm run build

# ⚡ Stage 2: Production setup
FROM node:18-alpine

WORKDIR /app

# Copy only necessary built files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Copy client build output explicitly
COPY --from=builder /app/client/dist ./client/dist

# Expose required ports
EXPOSE 80 3000

# Set environment variables (for testing; use .env in production)
ENV NODE_ENV=production
ENV MONGODB_URI=mongodb+srv://ghost:ghostishere@cluster0.llqvm.mongodb.net/

# Start the application
CMD ["npm", "start"]
