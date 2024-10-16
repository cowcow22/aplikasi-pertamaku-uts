# Dockerfile for Backend
FROM node:18

# Set working directory for backend
WORKDIR /app/backend

# Copy package.json and pnpm-lock.yaml for backend
COPY backend/package.json backend/pnpm-lock.yaml ./

# Install dependencies for backend
RUN npm install

# Copy all backend code, including db
COPY backend/ .

# Expose port 3000
EXPOSE 3000

# Command to run the backend server
CMD ["npm", "start"]
