# Stage 1: Build the Angular application
FROM 154972961986.dkr.ecr.us-east-1.amazonaws.com/node18:latest AS build
WORKDIR /app
COPY /app/package.json /app/package-lock.json ./
RUN npm ci
COPY /app .
RUN npm run build-prod

# Stage 2: Serve the application with Nginx
FROM 154972961986.dkr.ecr.us-east-1.amazonaws.com/nginx:latest
COPY --from=build /app/dist/app /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
