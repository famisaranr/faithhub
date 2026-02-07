# syntax=docker/dockerfile:1.6

FROM node:20-bookworm-slim AS base
WORKDIR /repo
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate
RUN apt-get update -y && apt-get install -y openssl

FROM base AS prune
RUN apt-get update && apt-get install -y --no-install-recommends git ca-certificates \
    && rm -rf /var/lib/apt/lists/*
COPY . .
RUN pnpm dlx turbo@latest prune --scope=web --docker

FROM base AS deps
WORKDIR /app
COPY --from=prune /repo/out/json/ ./
COPY --from=prune /repo/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=prune /repo/out/full/ ./
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
RUN cd apps/web && pnpm run db:generate
ENV NODE_ENV=production
RUN pnpm turbo run build --filter=web...

FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN apt-get update -y && apt-get install -y openssl
RUN useradd -m nextjs && chown -R nextjs:nextjs /app
USER nextjs

COPY --from=build --chown=nextjs:nextjs /app/apps/web/.next/standalone ./
COPY --from=build --chown=nextjs:nextjs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=build --chown=nextjs:nextjs /app/apps/web/public ./apps/web/public
COPY --from=build --chown=nextjs:nextjs /app/apps/web/prisma ./apps/web/prisma
COPY --from=build --chown=nextjs:nextjs /app/apps/web/package.json ./apps/web/package.json

EXPOSE 3000
CMD ["node", "apps/web/server.js"]
