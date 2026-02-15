# Frontend: Vue + Vite dev server. Browser calls API at VITE_API_URL (host's localhost:3000).
FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

# Expose Vite dev server; --host so container accepts connections from host
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
