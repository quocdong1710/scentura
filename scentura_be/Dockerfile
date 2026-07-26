FROM node:18-alpine

# Install build tools in case sqlite3 requires compilation
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies including devDependencies (to build TS)
RUN npm install

# Copy source code
COPY . .

# Build the TypeScript project
RUN npm run build

# Create a folder for the SQLite database
RUN mkdir -p /app/data

# Port configuration
EXPOSE 5000

ENV PORT=5000
ENV NODE_ENV=production

# Run start script
CMD ["npm", "start"]
