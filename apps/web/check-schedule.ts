
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const tenant = await prisma.tenant.findUnique({ where: { slug: 'batangas' } });
        if (!tenant) {
            console.error('Tenant not found');
            return;
        }
        console.log('Tenant:', tenant.id);

        const today = new Date();
        const day = today.getDay(); // 5 for Friday
        const daysUntilSabbath = (6 - day + 7) % 7;
        const nextSabbath = new Date(today);
        nextSabbath.setDate(today.getDate() + daysUntilSabbath);
        nextSabbath.setHours(0, 0, 0, 0);

        const endSabbath = new Date(nextSabbath);
        endSabbath.setHours(23, 59, 59, 999);

        console.log('Searching for plans between:', nextSabbath, 'and', endSabbath);

        const plans = await prisma.servicePlan.findMany({
            where: {
                tenantId: tenant.id,
                // date: {
                //     gte: nextSabbath,
                //     lte: endSabbath
                // }
            }
        });

        console.log('All Service Plans count:', plans.length);
        console.log('Plans found:', JSON.stringify(plans, null, 2));

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
