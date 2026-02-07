import { db } from './src/lib/db';

async function main() {
    try {
        const count = await db.tenant.count();
        const tenants = await db.tenant.findMany({ select: { name: true, slug: true } });
        console.log(`Total tenants: ${count}`);
        console.log('Tenants:', JSON.stringify(tenants, null, 2));
    } catch (error) {
        console.error('Error counting tenants:', error);
    } finally {
        // We need to verify if the db instance handles disconnect or if we need to do it manually
        // checking src/lib/db.ts, it doesn't export a disconnect function but uses globalForPrisma.
        // However, for a script, process exit will usually handle mostly, but prisma warns.
        process.exit(0);
    }
}

main();
