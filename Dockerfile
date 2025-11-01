# ---------- STAGE 1: Frontend build ----------
FROM node:20-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --omit=optional
COPY frontend .
# 👇 llama directamente al CLI de Vite
RUN node node_modules/vite/bin/vite.js build

# ---------- STAGE 2: Backend build ----------
FROM node:20-alpine AS backend
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --omit=optional
COPY backend .
COPY --from=frontend /app/frontend/dist ./public
RUN npx prisma generate || true
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
