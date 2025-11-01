# ---------- STAGE 1: Frontend build ----------
FROM node:20-bullseye-slim AS frontend
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci || npm install
COPY frontend .

# Evita wrappers y permisos raros
RUN chmod -R +x node_modules/.bin || true \
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

# 2) Copia el código backend
COPY backend .

# 3) Compila evitando wrappers .bin (Nest o TSC como fallback)
#    - Si no tienes @nestjs/cli, entrará el tsc
#    - Si no tienes tsconfig.build.json, compila con tsconfig.json
RUN chmod -R +x node_modules/.bin || true \
  && (node node_modules/@nestjs/cli/bin/nest.js build \
      || node node_modules/typescript/bin/tsc -p tsconfig.build.json \
      || node node_modules/typescript/bin/tsc -p tsconfig.json)

# 4) Verificación: asegúrate que exista el build en alguna ruta conocida
RUN ls -la || true \
  && ls -la dist || true \
  && bash -lc 'set -e; f=""; for p in dist/main.js dist/src/main.js dist/apps/api/main.js; do [ -f "$p" ] && f="$p" && break; done; if [ -z "$f" ]; then echo "❌ No compiled entry found under dist/"; exit 1; else echo "✅ Compiled entry: $f"; fi'

# 5) Genera Prisma client
RUN npx prisma generate || true

# 6) (Opcional) quita dev deps para aligerar la imagen
RUN npm prune --omit=dev || true

# 7) Copia el build del frontend para servirlo desde /public (si tu app lo usa)
COPY --from=frontend /app/frontend/dist ./public

EXPOSE 3000

# 8) Ejecuta el entrypoint que sí exista
CMD bash -lc 'set -e; for p in dist/main.js dist/src/main.js dist/apps/api/main.js; do if [ -f "$p" ]; then exec node "$p"; fi; done; echo "❌ No compiled entry under dist/"; ls -R dist || true; exit 1'
