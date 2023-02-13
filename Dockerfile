# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
COPY src/client/package.json src/client/package-lock.json* ./src/client/
RUN npm run ci:install

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/src/client/node_modules ./src/client/node_modules
COPY . .

RUN npm run ci:build

# Production image, copy all the files and start the app
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist .
COPY --from=builder /app/schema ./schema

USER expressjs

EXPOSE 8080

CMD node server.js