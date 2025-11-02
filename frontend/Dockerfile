FROM node:20-bullseye-slim

WORKDIR /app

# Install pnpm and corepack
RUN npm install -g pnpm
RUN npm install -g corepack
RUN corepack enable && corepack prepare pnpm@latest --activate
# Copy only package files first for caching
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]