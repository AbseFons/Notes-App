FROM node:20-bookworm-slim

WORKDIR /app

# ✅ agrega OpenSSL para que Prisma no falle
RUN apt-get update \
 && apt-get install -y --no-install-recommends openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*

COPY package.json ./
RUN npm i --silent

COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

# Genera cliente Prisma en build
RUN npx prisma generate

EXPOSE 3000
CMD ["npm", "run", "start:dev"]