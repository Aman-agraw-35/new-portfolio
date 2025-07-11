# ⚡ Stage 1: Build the project
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Optional: Tailwind build (only needed if not done via Vite/PostCSS plugins)
# Make sure the input/output paths are valid
# You can remove this if Tailwind is integrated via PostCSS in Vite
# RUN npx tailwindcss -c tailwind.config.ts -i client/src/index.css -o client/src/output.css

# Run the Vite + server build
RUN npm run build

# ⚡ Stage 2: Production setup
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/client/dist ./client/dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose your application's port
EXPOSE 3000

# Set environment variables (for testing only; use .env or secrets in production)
ENV NODE_ENV=production
ENV MONGODB_URI=mongodb+srv://ghost:ghostishere@cluster0.llqvm.mongodb.net/

# Start the Express server (not npm run start for Vite, which is dev-only)
CMD ["node", "dist/index.js"]
