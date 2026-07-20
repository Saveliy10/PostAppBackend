# ---------- Stage 1: Build ----------
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run prisma:generate

RUN npm run build

# ---------- Stage 2: Production ----------
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

RUN npm run prisma:generate

EXPOSE 3000

CMD ["sh", "-c", "npm run db:push && node dist/src/main.js"]