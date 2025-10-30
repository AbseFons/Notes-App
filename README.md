# Notes Challenge – Full Stack (NestJS + React)

Monorepo con **backend** (NestJS + Prisma + PostgreSQL) y **frontend** (React + Vite + TS).
Cumple separación por capas, SPA independiente y script de arranque.

## Requisitos
- Node.js 20.x, npm 10.x
- Docker + Docker Compose
- (Opcional) Make

## Estructura
```
.
├─ backend/       # API REST NestJS + Prisma
├─ frontend/      # SPA React + Vite
├─ docker-compose.yml
├─ start.sh
└─ .env.example
```

## Variables de entorno
Copiar `.env.example` a `.env` en la raíz o exportarlas en tu shell:

```
DATABASE_URL=postgresql://notes:notes@localhost:5432/notesdb?schema=public
PORT=3000
JWT_SECRET=dev-secret
```

> **Nota**: `docker-compose` inyecta estas variables a `backend` y `db`.

## Inicio rápido (1 comando)
```bash
chmod +x start.sh
./start.sh
```
- Levanta `db`, genera el esquema con Prisma, inicia `backend` en `http://localhost:3000` (Swagger en `/docs`) y `frontend` en `http://localhost:5173`.

## Scripts útiles
### Backend
```bash
cd backend
npm i
npm run prisma:generate
npm run prisma:db:push
npm run start:dev
```

### Frontend
```bash
cd frontend
npm i
npm run dev
```

## Endpoints principales (Fase 1)
- `GET /notes?archived=false` – lista activas
- `GET /notes?archived=true` – lista archivadas
- `POST /notes` – crear
- `PATCH /notes/:id` – actualizar (incluye `archived`)
- `DELETE /notes/:id` – eliminar

## Fase 2 (tags/categorías)
- `POST /notes/:id/tags` – agregar tags
- `DELETE /notes/:id/tags/:tagId` – quitar tag
- `GET /notes?tag=...` – filtrar por tag

## Credenciales (si implementas login)
Documentar aquí usuario/clave por defecto.

## Despliegue
- Puedes desplegar `backend` en Render/Fly/Heroku y `frontend` en Netlify/Vercel. Documenta URL si lo haces.

## Licencia
MIT
