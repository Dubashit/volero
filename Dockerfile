# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container, including .env
COPY . .

# Build the React application
RUN npm run build

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Set the environment variables (port can be overridden in your .env file if needed)
ENV PORT=3000

# Expose the port the app will run on
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "build", "-l", "3000"]