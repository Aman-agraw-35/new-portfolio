# Base image for building
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the project
RUN npm run build

# Production image
FROM node:18-alpine

WORKDIR /app

# Copy built files and dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/postcss.config.js ./postcss.config.js
COPY --from=builder /app/tailwind.config.ts ./tailwind.config.ts
COPY --from=builder /app/theme.json ./theme.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/vite.config.ts ./vite.config.ts
COPY --from=builder /app/docker-compose.yml ./docker-compose.yml
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder /app/README.md ./README.md

# Copy client, server, and shared directories
COPY --from=builder /app/client ./client
COPY --from=builder /app/server ./server
COPY --from=builder /app/shared ./shared

# Expose necessary ports
EXPOSE 80 3000

# Set environment variables (Use .env instead in production)
ENV MONGODB_URI=mongodb+srv://ghost:ghostishere@cluster0.llqvm.mongodb.net/

# Start the server
CMD ["npm", "start"]

