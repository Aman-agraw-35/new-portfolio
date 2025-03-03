# Use Node.js as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy entire project
COPY . .

# Build the Vite client
RUN npm run build

# Expose necessary ports
EXPOSE 80 5173 3000

# Start both client and server
CMD ["npm", "start"]
