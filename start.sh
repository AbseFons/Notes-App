#!/usr/bin/env bash
set -euo pipefail

echo "==> Preparando contenedores (db, backend, frontend)..."
docker compose down --remove-orphans || true
docker compose build

echo "==> Levantando servicios..."
docker compose up -d db
# Espera simple a que db acepte conexiones
echo "Esperando a Postgres..."
until docker compose exec -T db pg_isready -U notes -h localhost >/dev/null 2>&1; do
  sleep 1
done

echo "==> Generando cliente Prisma y migrando schema..."
docker compose run --rm backend npm run prisma:generate
docker compose run --rm backend npm run prisma:db:push

echo "==> Levantando backend y frontend en modo desarrollo..."
docker compose up -d backend frontend

echo "==> URLs:"
echo "Backend:   http://localhost:3000 (Swagger en /docs)"
echo "Frontend:  http://localhost:5173"
