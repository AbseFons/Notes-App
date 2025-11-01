FROM node:20-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends procps openssl \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./
RUN npm ci --silent

COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

RUN npx prisma generate

EXPOSE 3000
CMD ["npm", "run", "start:dev"]