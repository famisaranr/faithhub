const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Attempting to connect to database...');
        await prisma.$connect();

        // Find Batangas tenant
        const tenant = await prisma.tenant.findUnique({ where: { slug: 'batangas' } });

        if (tenant) {
            console.log('Found Batangas tenant:', tenant.id);

            console.log('Attempting to create bulletin...');
            const bulletin = await prisma.bulletin.create({
                data: {
                    tenantId: tenant.id,
                    title: "Test Bulletin CLI",
                    date: new Date(),
                    fileUrl: "https://example.com/test.pdf"
                }
            });
            console.log('Bulletin created successfully:', bulletin.id);

            const bulletins = await prisma.bulletin.findMany({
                where: { tenantId: tenant.id }
            });
            console.log('Current bulletins:', JSON.stringify(bulletins, null, 2));

        } else {
            console.error('Batangas tenant not found!');
        }

        await prisma.$disconnect();
        process.exit(0);
    } catch (e) {
        console.error('Failed to create bulletin:', e);
        process.exit(1);
    }
}

main();
