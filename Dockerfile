# Base image for building the frontend (Vite + React)
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for both client and server
COPY package.json package-lock.json ./
COPY client/package.json client/package-lock.json ./client/
COPY server/package.json server/package-lock.json ./server/

# Install root dependencies
RUN npm install

# Install client dependencies separately
WORKDIR /app/client
RUN npm install
RUN npm run build

# Install server dependencies separately
WORKDIR /app/server
RUN npm install

# Production image
FROM node:18-alpine AS production

WORKDIR /app

# Copy only necessary files from the builder
COPY --from=builder /app/server ./server
COPY --from=builder /app/client/dist ./server/public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose necessary ports
EXPOSE 3000

# Set environment variables (Ensure `.env` is used in production)
ENV NODE_ENV=production

# Start the Express server
CMD ["node", "server/index.js"]
