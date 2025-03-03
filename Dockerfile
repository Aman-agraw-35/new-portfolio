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

# Expose necessary ports
EXPOSE 80 3000

# Set environment variables (Use .env instead in production)
ENV MONGODB_URI=mongodb+srv://ghost:ghostishere@cluster0.llqvm.mongodb.net/

# Start the server
CMD ["npm", "start"]

