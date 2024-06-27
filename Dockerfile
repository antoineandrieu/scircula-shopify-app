# Install dependencies only when needed
FROM node:alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat libcap
WORKDIR /app
COPY package.json package-lock.json  ./
RUN npm install npm@latest -g
RUN npm install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm ci
# TODO: Trick to pass variables to client https://dev.to/itsrennyman/manage-nextpublic-environment-variables-at-runtime-with-docker-53dl
RUN NEXT_PUBLIC_API_URL=APP_NEXT_PUBLIC_API_URL NEXT_PUBLIC_SHOPIFY_API_KEY=APP_NEXT_PUBLIC_SHOPIFY_API_KEY npm run build

# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/server ./server
COPY --from=builder /app/tsconfig.server.json ./tsconfig.server.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh

USER nextjs

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1

ENTRYPOINT ["/app/entrypoint.sh"]

CMD ["npm", "start"]
