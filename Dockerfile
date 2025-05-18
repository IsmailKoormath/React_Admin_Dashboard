# Stage 1: Build the Vite app
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with `serve`
FROM node:18-alpine

# Install `serve` globally
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy build output from builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Start the app with `serve`
CMD ["serve", "-s", "dist", "-l", "3000"]
