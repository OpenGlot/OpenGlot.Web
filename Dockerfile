# Stage 1: Build the React application
FROM node:18 AS build
WORKDIR /app

# Copy the app directory
COPY app ./

# Install dependencies
RUN yarn install

# Build the application (assuming your React app uses 'yarn build')
RUN yarn build:docker

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy built files to Nginx (adjust the path if necessary)
COPY --from=build /app/build /usr/share/nginx/html

# Copy the Nginx configuration file
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
