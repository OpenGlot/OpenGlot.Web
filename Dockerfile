# Stage 1: Build the React application
FROM node:18
WORKDIR /app

# Copy the app directory
COPY app ./

# Install dependencies
RUN yarn install


EXPOSE 80
CMD ["yarn", "start:docker"]
