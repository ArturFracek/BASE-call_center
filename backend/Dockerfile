# Backend: Node + Express + Drizzle. Run db:push + seed then start server.
FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# db:push and db:seed need drizzle-kit/tsx (devDependencies) – keep them for runtime entrypoint
EXPOSE 3000

ENV NODE_ENV=production
# DATABASE_URL set by docker-compose; push + seed then start server
ENTRYPOINT ["sh", "-c", "npm run db:push && npm run db:seed && node dist/src/server/index.js"]
