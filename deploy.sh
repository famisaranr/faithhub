#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Navigate to web app directory
cd apps/web

# 1. Run migrations
echo "📦 Running database migrations..."
pnpm prisma migrate deploy

# 2. Run seed (idempotent - uses upsert)
echo "🌱 Seeding database..."
pnpm prisma db seed

# 3. Build application
echo "🏗️  Building application..."
pnpm build

# 4. Start application
echo "✅ Deployment complete! Starting application..."
pnpm start
