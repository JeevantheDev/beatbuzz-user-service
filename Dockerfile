# Use an official Node.js runtime as the base image
FROM node:18.2

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your Express application listens on
EXPOSE 7998

# Set the environment variable
ENV NODE_ENV=production
ENV secretKey=dsjfsdjfgdjhfgdjhgfdjhdfgjhdfj

# Start the application
CMD ["npm", "start"]
