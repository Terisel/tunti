# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN ["npm", "install"]

# Copy the rest of your application code
COPY . .

# Build the TypeScript code
RUN ["npm", "run", "build"]

# Expose the port that your app runs on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]