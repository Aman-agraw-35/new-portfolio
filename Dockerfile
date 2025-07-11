# ⚡ Stage 1: Build the project
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire app
COPY . .

# Build the client (Vite) and server (e.g., esbuild or skip if using tsx in prod)
RUN npm run build

# ⚡ Stage 2: Production setup
FROM node:18

WORKDIR /app

# Only copy production dependencies
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Copy build artifacts
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/client/dist ./client/dist

# Copy any other necessary runtime files (e.g., public folder, .env if needed)
COPY --from=builder /app/public ./public

# Expose port (optional if using 80 or 3000)
EXPOSE 3000

# Set env
ENV NODE_ENV=production

# Start the server
CMD ["node", "dist/index.js"]
