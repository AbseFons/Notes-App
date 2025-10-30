# Usa una base Debian moderna con OpenSSL listo
FROM node:20-bookworm-slim

WORKDIR /app

# Instala dependencias del proyecto
COPY package.json ./
RUN npm i --silent

# Copia config y código
COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

# Genera el cliente de Prisma
RUN npx prisma generate

EXPOSE 3000
CMD ["npm", "run", "start:dev"]
