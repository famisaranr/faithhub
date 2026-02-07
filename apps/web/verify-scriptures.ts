
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log("Verifying hymns...")
    const hymns = await prisma.hymn.findMany({
        where: { number: { lte: 10 } },
        select: {
            number: true,
            title: true,
            scriptureRefs: true
        }
    })

    console.log(JSON.stringify(hymns, null, 2))
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect())
