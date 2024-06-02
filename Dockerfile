# Stage 1: Build the Angular application
FROM node:18 AS build
WORKDIR /app
COPY /app/package.json /app/package-lock.json ./
RUN npm ci
COPY /app .
RUN npm run build-docker

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/app /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
