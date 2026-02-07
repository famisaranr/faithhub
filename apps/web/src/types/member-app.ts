export interface MemberProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string; // or base64
    role: "member" | "officer" | "guest";
    church: string; // e.g., "Batangas City Central"
}

export interface NotificationItem {
    id: string;
    type: 'info' | 'alert' | 'success';
    title: string;
    message: string;
    time: string;
    read: boolean;
}

export interface ScheduleItem {
    id: string;
    time: string; // "08:30"
    title: string; // "Sabbath School"
    description?: string; // "Superintendent: ..."
    details?: string; // "Lesson 4..."
    color?: string; // Optional override
    isCurrent?: boolean; // Calculated on client usually, but can be hinted
    type: "sabbath_school" | "divine_service" | "ay" | "vespers" | "other";
}

export interface BulletinItem {
    id: string;
    title: string;
    content: string;
    date: string;
    priority: "high" | "normal";
}

export interface ChurchEvent {
    id: string;
    title: string;
    date: string; // ISO or formatted
    time: string;
    location: string;
    description: string;
    imageUrl?: string;
    requiresRsvp?: boolean;
}

export type GivingType = "tithe" | "offering" | "project";

export interface DevotionalContent {
    date: string;
    type: 'morning' | 'evening';
    title: string;
    source: string;
    page: string;
    verse: string;
    content: string[];
}

export interface LiturgyItem {
    type: string; // "Call to Worship", "Hymn", etc.
    title: string;
    presenter?: string;
    action?: "Stand" | "Kneel" | "Sit";
    details?: string;
}

export interface WorshipServiceData {
    preacher: string;
    topic: string;
    text: string;
    hymns: {
        opening: string;
        scripture: string;
        closing: string;
    };
    liturgy: LiturgyItem[];
}
