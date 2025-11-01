# ---------- STAGE 1: Frontend build ----------
FROM node:20-bullseye-slim AS frontend
WORKDIR /app/frontend

# Dependencias
COPY frontend/package*.json ./
RUN npm ci || npm install

# Código
COPY frontend .

# Evita wrapper y permisos raros
RUN chmod -R +x node_modules/.bin \
  && node node_modules/vite/bin/vite.js build

# ---------- STAGE 2: Backend build ----------
FROM node:20-bullseye-slim AS backend
WORKDIR /app
ENV NODE_ENV=production

# Dependencias de sistema (openssl para Prisma)
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Instalar deps backend
COPY backend/package*.json ./
RUN npm ci || npm install

# Copiar código backend
COPY backend .

# Compilar TypeScript -> dist/
# (si no tienes script build, usa el fallback con tsc)
RUN npm run build || npx tsc -p tsconfig.build.json

# Generar cliente Prisma
RUN npx prisma generate || true

# (Opcional) reducir tamaño: dejar solo deps prod
RUN npm prune --omit=dev || true

# Servir frontend estático desde /public (si tu app lo usa)
COPY --from=frontend /app/frontend/dist ./public

EXPOSE 3000

# Asegúrate de que este script exista o llama node dist/main.js
CMD ["node", "dist/main.js"]
