FROM node:22-alpine

WORKDIR /app

# Install build dependencies for sql.js (WASM)
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./
RUN npm ci --only=production || npm install

# Copy source and build
COPY tsconfig.json ./
COPY src/ ./src/
RUN npm run build

# Copy admin SPA
COPY admin/ ./admin/

# Seed database
RUN node dist/seed.js

# Expose port
EXPOSE 10000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:10000/api/health || exit 1

# Start server
CMD ["node", "dist/index.js"]
