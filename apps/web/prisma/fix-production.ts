import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Starting production cleanup...')

    // 1. Cleanup Duplicate Members
    // We group by email/name + tenantId and keep the OLDEST one.
    console.log('Checking for duplicate members...')
    const tenants = await prisma.tenant.findMany();

    for (const tenant of tenants) {
        const members = await prisma.member.findMany({
            where: { tenantId: tenant.id },
            orderBy: { createdAt: 'asc' } // Keep the oldest
        })

        const seenKeys = new Set<string>()
        let deletedCount = 0

        for (const member of members) {
            // Use email as unique key, fall back to name if no email
            const key = member.email || member.name;

            if (seenKeys.has(key)) {
                console.log(`Removing duplicate member: ${member.name} (${member.email}) - ID: ${member.id}`)
                await prisma.member.delete({ where: { id: member.id } })
                deletedCount++
            } else {
                seenKeys.add(key)
            }
        }
        if (deletedCount > 0) {
            console.log(`Tenant ${tenant.name}: Removed ${deletedCount} duplicate members.`)
        }
    }

    // 2. Report on Service Plans
    const planCount = await prisma.servicePlan.count()
    console.log(`\nTotal Service Plans in DB: ${planCount}`)
    if (planCount === 0) {
        console.warn('WARNING: No service plans found. If you lost data, you may need to re-run seed (it is now safe) or restore from backup.')
    }

    console.log('\nCleanup complete.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
