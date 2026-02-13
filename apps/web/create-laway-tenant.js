// Manual seed script to create Laway tenant
// Run this in production: docker exec -it <container_id> sh -c "cd apps/web && node create-laway-tenant.js"

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createLawayTenant() {
    console.log('🔍 Checking if Laway tenant exists...')

    const existing = await prisma.tenant.findUnique({
        where: { slug: 'laway-sda' }
    })

    if (existing) {
        console.log('✅ Laway tenant already exists!')
        console.log(`   ID: ${existing.id}`)
        console.log(`   Name: ${existing.name}`)
        console.log(`   Slug: ${existing.slug}`)
        return
    }

    console.log('❌ Laway tenant not found. Creating...')

    const tenant = await prisma.tenant.create({
        data: {
            name: 'Laway Seventh Day Adventist Church',
            slug: 'laway-sda',
            customDomain: 'laway.church',
        }
    })

    console.log('✅ Laway tenant created successfully!')
    console.log(`   ID: ${tenant.id}`)
    console.log(`   Name: ${tenant.name}`)
    console.log(`   Slug: ${tenant.slug}`)

    await prisma.$disconnect()
}

createLawayTenant()
    .catch((error) => {
        console.error('❌ Error:', error)
        process.exit(1)
    })
