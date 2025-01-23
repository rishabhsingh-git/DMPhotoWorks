#Development stage
# Use the official Node.js image as the base image
FROM node:22-alpine as dev

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install development dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 5000

# Command to run the application in development mode
CMD ["yarn", "run", "start:dev"]


