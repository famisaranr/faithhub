
"use server";

import { db } from "@/lib/db";
import { Hymn, Recording, Prisma } from "@prisma/client";

export type HymnWithRecordings = Hymn & { recordings: Recording[] };

export async function getHymns(search?: string): Promise<HymnWithRecordings[]> {
    try {
        const queryFilter: Prisma.HymnWhereInput = buildHymnSearchFilter(search);

        return await db.hymn.findMany({
            where: queryFilter,
            include: { recordings: true },
            orderBy: { number: 'asc' }
        });
    } catch (error) {
        console.error("Failed to fetch hymns:", error);
        return [];
    }
}

export async function getHymn(hymnId: string): Promise<HymnWithRecordings | null> {
    try {
        return await db.hymn.findUnique({
            where: { hymnId },
            include: { recordings: true }
        });
    } catch (error) {
        console.error(`Failed to fetch hymn ${hymnId}:`, error);
        return null;
    }
}

/**
 * Builds the Prisma where clause for searching hymns.
 * Handles text search in title/lyrics and exact matching for hymn numbers.
 */
function buildHymnSearchFilter(search?: string): Prisma.HymnWhereInput {
    if (!search?.trim()) return {};

    const term = search.trim();
    const numberQuery = parseInt(term);
    const isNumberSearch = !isNaN(numberQuery);

    return {
        OR: [
            { title: { contains: term, mode: 'insensitive' } },
            ...(isNumberSearch ? [{ number: { equals: numberQuery } }] : []),
            { lyrics: { contains: term, mode: 'insensitive' } },
        ]
    };
}
