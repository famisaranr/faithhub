import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Attempting to connect to database...');
        await prisma.$connect();
        console.log('Successfully connected to database!');

        const count = await prisma.tenant.count();
        console.log(`Found ${count} tenants in the database.`);

        await prisma.$disconnect();
    } catch (e) {
        console.error('Failed to connect to database:', e);
        process.exit(1);
    }
}

main();
