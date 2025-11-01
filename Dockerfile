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

# Dependencias de sistema (OpenSSL para Prisma)
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# 1) Instala dependencias (con dev, porque vamos a compilar)
COPY backend/package*.json ./
RUN npm ci || npm install

# 2) Copia el código
COPY backend .

# 3) Compila evitando wrappers .bin (Nest o TSC)
#    - Si tienes Nest CLI como devDependency, intentará primero Nest; si falla, cae a TSC.
#    - El chmod es defensivo por si algunos .bin no traen +x.
RUN chmod -R +x node_modules/.bin || true \
  && (node node_modules/@nestjs/cli/bin/nest.js build || node node_modules/typescript/bin/tsc -p tsconfig.build.json)

# 4) Genera Prisma client
RUN npx prisma generate || true

# 5) (Opcional) quitar devDependencies para aligerar imagen
RUN npm prune --omit=dev || true

# 6) Copia el build del frontend
COPY --from=frontend /app/frontend/dist ./public

EXPOSE 3000
CMD ["node", "dist/main.js"]
