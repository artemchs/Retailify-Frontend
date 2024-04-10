# Build stage
FROM node:20-alpine as build

# Set a default value for NODE_ENV
ENV NODE_ENV=production

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Copy the entire project
COPY . .

# Build the React app
RUN pnpm run build



# Production stage
FROM nginx:stable-alpine

# Copy the built files to the Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port Nginx will listen on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]