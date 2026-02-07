"use server";

import { BulletinItem, ChurchEvent, MemberProfile, ScheduleItem, WorshipServiceData, DevotionalContent } from "@/types/member-app";

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getMemberProfile(): Promise<MemberProfile> {
    await delay(500);
    return {
        id: "mem_123",
        name: "Russell Famisaran",
        role: "officer",
        church: "Batangas City Central",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Russell"
    };
}

export async function getSabbathSchedule(): Promise<ScheduleItem[]> {
    await delay(800);
    return [
        {
            id: "1",
            time: "08:30",
            title: "Sabbath School",
            description: "Superintendent: Sis. Maria Santos",
            type: "sabbath_school"
        },
        {
            id: "2",
            time: "09:30",
            title: "Lesson Study",
            description: "Lesson 4: Psalms of Deliverance",
            details: "Separation by Classes",
            type: "sabbath_school"
        },
        {
            id: "3",
            time: "10:45",
            title: "Divine Worship",
            description: "Speaker: Pr. Jun Cruz (SCLC)",
            details: "Topic: Faith in the Fire",
            type: "divine_service"
        },
        {
            id: "4",
            time: "16:00",
            title: "Adventist Youth (AY)",
            description: "Host: Youth Department",
            type: "ay"
        }
    ];
}

export async function getBulletins(): Promise<BulletinItem[]> {
    await delay(600);
    return [
        {
            id: "b1",
            title: "Dorcas Society Meeting",
            content: "There will be a brief meeting after the Potluck lunch for all Dorcas members.",
            date: "Today",
            priority: "normal"
        },
        {
            id: "b2",
            title: "Emergency Drilling",
            content: "Please be advised that we will have a fire drill next Sabbath.",
            date: "Next Week",
            priority: "high"
        }
    ];
}

export async function getUpcomingEvents(): Promise<ChurchEvent[]> {
    await delay(700);
    return [
        {
            id: "e1",
            title: "District Fellowship",
            date: "Feb 15, 2026",
            time: "8:00 AM",
            location: "Batangas City Convention Center",
            description: "Joint worship service for all district churches.",
            imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2670&auto=format&fit=crop"
        },
        {
            id: "e2",
            title: "Health Expo",
            date: "Mar 01, 2026",
            time: "1:00 PM",
            location: "Plaza Mabini",
            description: "Free medical checkups and lifestyle counseling.",
            imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2670&auto=format&fit=crop"
        }
    ];
}

export async function getWorshipData(): Promise<WorshipServiceData> {
    await delay(500);
    return {
        preacher: "Pr. Jun Cruz (SCLC)",
        topic: "Faith in the Fire",
        text: "Daniel 3:17-18",
        hymns: {
            opening: "001 - Praise to the Lord",
            scripture: "Psalm 23",
            closing: "524 - It Is Well With My Soul"
        },
        liturgy: [
            { type: "Doxology", title: "Praise God From Whom All Blessings Flow", action: "Stand" },
            { type: "Invocation", title: "Invocation", presenter: "Elder On Duty", action: "Kneel" },
            { type: "Welcome", title: "Welcome & Greetings", presenter: "Clerk on Duty" },
            { type: "Hymn", title: "001 - Praise to the Lord", action: "Stand" },
            { type: "Scripture", title: "Daniel 3:17-18", details: "Read by: Sis. Anna", action: "Stand" },
            { type: "Prayer", title: "Pastoral Prayer", presenter: "Elder On Duty", action: "Kneel" },
            { type: "Giving", title: "Tithes & Offerings", details: "Offertory Music", action: "Sit" },
            { type: "Feature", title: "Children's Story", presenter: "Teacher Joy" },
            { type: "Music", title: "Special Music", presenter: "Youth Choir" },
            { type: "Message", title: "Faith in the Fire", presenter: "Pr. Jun Cruz", action: "Sit" },
            { type: "Hymn", title: "524 - It Is Well With My Soul", action: "Stand" },
            { type: "Closing", title: "Benediction", presenter: "Pr. Jun Cruz", action: "Stand" }
        ]
    };
}

export async function getDailyDevotional(type: 'morning' | 'evening'): Promise<DevotionalContent> {
    await delay(600);
    const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    if (type === 'morning') {
        return {
            date,
            type: 'morning',
            title: "The Power of Patience",
            source: "Conflict and Courage",
            page: "124",
            verse: "Rest in the Lord, and wait patiently for Him. Psalm 37:7",
            content: [
                "God expects His children to be patient. In our modern world of instant gratification, patience is a virtue that is often overlooked.",
                "To wait for God's timing requires faith. It means trusting that He knows what is best for us and when it is best to provide it.",
                "Let us start this day by committing our plans to Him, asking for the strength to wait on His perfect will."
            ]
        };
    } else {
        return {
            date,
            type: 'evening',
            title: "Rest for the Weary",
            source: "Maranatha",
            page: "202",
            verse: "Come unto me, all ye that labour and are heavy laden, and I will give you rest. Matthew 11:28",
            content: [
                "As the day comes to a close, take a moment to unburden your heart. The trials of the day may have been heavy, but His grace is sufficient.",
                "Jesus invites us to exchange our weariness for His rest. It is not just physical sleep, but a deep spiritual peace that He offers.",
                "Sleep tonight in the assurance that He watches over you."
            ]
        };
    }
}

export async function submitOffering(breakdown: Record<string, number>) {
    await delay(1500);
    const total = Object.values(breakdown).reduce((a, b) => a + b, 0);
    console.log(`Processing offering breakdown:`, breakdown, `Total: ${total}`);
    return { success: true, transactionId: "txn_" + Date.now() };
}

export async function verifyOfficerPin(pin: string): Promise<boolean> {
    await delay(1000);
    return pin === "2026"; // Mock PIN
}

// Profile & Settings Actions

export async function getNotifications(): Promise<NotificationItem[]> {
    await delay(600);
    return [
        {
            id: "n1",
            type: "alert",
            title: "Sabbath Protocol",
            message: "Sunset is approaching in 15 minutes. Please prepare for worship.",
            time: "15m ago",
            read: false
        },
        {
            id: "n2",
            type: "info",
            title: "New Bulletin",
            message: "The weekly bulletin has been updated for Sabbath, Feb 8.",
            time: "2h ago",
            read: true
        },
        {
            id: "n3",
            type: "success",
            title: "Tithe Received",
            message: "Your tithe of ₱5,000 has been successfully recorded. Thank you for your faithfulness.",
            time: "1d ago",
            read: true
        }
    ];
}

export async function markNotificationAsRead(id: string) {
    await delay(300);
    return { success: true };
}

export async function logout() {
    await delay(1000);
    return { success: true };
}
