# ---------- STAGE 1: Frontend build ----------
FROM node:20-bullseye-slim AS frontend
WORKDIR /app/frontend

# Dependencias
COPY frontend/package*.json ./

RUN npm ci || npm install

# Código y build
COPY frontend .

RUN chmod -R +x node_modules/.bin \
  && node node_modules/vite/bin/vite.js build

# ---------- STAGE 2: Backend build ----------
FROM node:20-bullseye-slim AS backend
WORKDIR /app
ENV NODE_ENV=production

# Prisma suele requerir OpenSSL en runtime
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Dependencias backend
COPY backend/package*.json ./
RUN npm ci --omit=dev || npm install --only=prod

# Código backend
COPY backend .

# Servir el frontend estático desde /public
COPY --from=frontend /app/frontend/dist ./public

# Generar cliente Prisma
RUN npx prisma generate || true

EXPOSE 3000
CMD ["npm", "run", "start"]
