import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkTenants() {
    console.log('🔍 Checking all tenants in database...\n')

    const tenants = await prisma.tenant.findMany({
        select: {
            id: true,
            name: true,
            slug: true,
            customDomain: true,
        }
    })

    console.log(`Found ${tenants.length} tenant(s):\n`)

    tenants.forEach((tenant, index) => {
        console.log(`${index + 1}. ${tenant.name}`)
        console.log(`   ID: ${tenant.id}`)
        console.log(`   Slug: "${tenant.slug}"`)
        console.log(`   Custom Domain: ${tenant.customDomain || 'N/A'}`)
        console.log('')
    })

    // Check specifically for laway-sda
    const lawayTenant = await prisma.tenant.findUnique({
        where: { slug: 'laway-sda' }
    })

    if (lawayTenant) {
        console.log('✅ Laway tenant found with slug "laway-sda"')
    } else {
        console.log('❌ Laway tenant NOT found with slug "laway-sda"')
        console.log('   This is why laway-sda.ourfaithhub.com returns 404!')
    }

    await prisma.$disconnect()
}

checkTenants().catch(console.error)
