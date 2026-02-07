
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const count = await prisma.hymn.count();
    console.log(`Total hymns in DB: ${count}`);

    if (count > 0) {
        console.log('Checking for new hymns...');
        const newHymns = await prisma.hymn.findMany({
            where: {
                OR: [
                    { title: { contains: "Only-Begotten", mode: 'insensitive' } },
                    { title: { contains: "Light From", mode: 'insensitive' } }
                ]
            },
            include: {
                recordings: true
            }
        });

        console.log('New Hymns found in DB:');
        newHymns.forEach(h => {
            console.log(`- ${h.title} (ID: ${h.hymnId})`);
            console.log(`  Recordings: ${h.recordings.length}`);
            h.recordings.forEach(r => console.log(`    - ${r.audioUrl}`));
        });

        if (newHymns.length === 2) {
            console.log('\nSUCCESS: Both new hymns were found!');
        } else {
            console.log(`\nWARNING: Found ${newHymns.length} new hymns (expected 2).`);
        }
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
