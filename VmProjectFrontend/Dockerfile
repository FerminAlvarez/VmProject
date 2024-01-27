# Use an official Node runtime as a parent image
FROM node:16-slim

# Set the working directory to /app
WORKDIR /app

# Bundle app source
COPY . .

# Environment variables
ENV VITE_KEYCLOAK_URL=http://localhost:8080/
ENV VITE_KEYCLOAK_REALM=vmrealm
ENV VITE_KEYCLOAK_CLIENT=vmclient

ENV VITE_WEBSOCKET_URL_VM=ws://localhost:8000/vm/
ENV VITE_WEBSOCKET_URL_PYTHON=ws://localhost:8000/python/
ENV VITE_HTTP_URL_PYTHON=http://localhost:8000/file-python

# Copy package.json and package-lock.json to the container
COPY package*.json ./
COPY vite.config.js ./

# Install dependencies
RUN npm install

# Expose port 3000 (el puerto en el que se sirve tu aplicación Vite)
EXPOSE 5173

# Define the command to run your app
CMD ["npm", "run", "dev"]
