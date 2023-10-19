# Use an official Node.js runtime as the base image
FROM node:16-alpine
 
# Set the working directory in the container
WORKDIR /app
 
# Copy the package.json and package-lock.json files to the container
COPY package*.json ./
 
# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install
 
# Copy the app's source code to the container
COPY . .
 
# Build the Next.js app
RUN pnpm build
 
# Expose the port that Next.js runs on
EXPOSE 3000
 
# Run the Next.js app
CMD ["pnpm", "dev"]