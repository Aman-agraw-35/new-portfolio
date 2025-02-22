# Use the official Node.js image as base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the Next.js default port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
