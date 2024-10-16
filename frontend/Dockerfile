# Dockerfile for Frontend
FROM node:18-alpine

# Set working directory for frontend
WORKDIR /app/frontend

# Copy package.json and pnpm-lock.yaml for frontend
COPY /frontend/package*.json ./

# Install dependencies for frontend
RUN npm install

# Copy all frontend code
COPY /frontend .

# Build the frontend
RUN npm run build

# Expose port 5173 for frontend
EXPOSE 5173

# Command to serve frontend
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
