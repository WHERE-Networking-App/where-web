FROM oven/bun:1 AS base
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Build the app
FROM base AS builder
WORKDIR /app
ARG NEXT_PUBLIC_EXTERNAL_API_URL
ENV NEXT_PUBLIC_EXTERNAL_API_URL=$NEXT_PUBLIC_EXTERNAL_API_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun next build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN useradd --system --uid 1001 nextjs
RUN mkdir .next && chown nextjs:bun .next

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:bun /app/.next/standalone ./
COPY --from=builder --chown=nextjs:bun /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["bun", "server.js"]
