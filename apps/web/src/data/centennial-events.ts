export interface ProgramItem {
    time?: string;
    part: string;
    person?: string;
    note?: string;
}

export interface EventItem {
    date: string;
    year: string;
    title: string;
    description: string;
    highlight?: boolean;
    program?: ProgramItem[]; // Optional detailed program
}

export const EVENTS: EventItem[] = [
    {
        date: "January 17 - April 26",
        year: "2026",
        title: "100 Days of Prayer",
        description: "Launch of our spiritual journey leading up to the centennial.",
        program: [
            { part: "Daily Devotional", note: "Via Zoom & Facebook Live (5:00 AM)" },
            { part: "Weekly Prayer Meeting", note: "Every Wednesday @ 7:00 PM" }
        ]
    },
    {
        date: "July 12",
        year: "2026",
        title: "Blood Donation Drive",
        description: "Community service initiative saving lives.",
        program: [
            { time: "8:00 AM", part: "Opening Prayer & Orientation", person: "Dr. Health Ministries" },
            { time: "8:30 AM", part: "Blood Extraction Begins" },
            { time: "12:00 PM", part: "Closing & Distribution of Snacks" }
        ]
    },
    {
        date: "July 18",
        year: "2026",
        title: "Centennial Church Family Banquet / Gala Night",
        description: "A formal evening of gratitude and fellowship.",
        highlight: true,
        program: [
            { time: "6:00 PM", part: "Red Carpet & Photo Op" },
            { time: "6:30 PM", part: "Opening Prayer", person: "Elder Cruz" },
            { time: "6:35 PM", part: "Welcome Remarks", person: "Centennial Chairman" },
            { time: "7:00 PM", part: "Dinner Service (Buffet)" },
            { time: "8:00 PM", part: "History Video Presentation", note: "'100 Years of Grace'" },
            { time: "8:30 PM", part: "Awarding of Pioneers" },
            { time: "9:30 PM", part: "Closing Prayer" }
        ]
    },
    {
        date: "July 19 - 24",
        year: "2026",
        title: "Revival & Reaping Campaign",
        description: "Nightly worship and revival meetings.",
        program: [
            { time: "7:00 PM", part: "Nightly Service", note: "Guest Speaker: Pr. Evangelist" }
        ]
    },
    {
        date: "July 19 - 25",
        year: "2026",
        title: "Church History Exhibit",
        description: "A walk through 100 years of God's leading.",
        program: [
            { time: "8:00 AM - 5:00 PM", part: "Open Viewing", note: "Church Lobby" }
        ]
    },
    {
        date: "July 19",
        year: "2026",
        title: "Grand Motorcade",
        description: "A parade around the city celebrating our history.",
        program: [
            { time: "6:00 AM", part: "Assembly", note: "Church Grounds" },
            { time: "7:00 AM", part: "Motorcade Begins" }
        ]
    },
    {
        date: "July 19",
        year: "2026",
        title: "Community Heroes Recognition",
        description: "Honoring those who serve our city.",
        program: [
            { time: "3:00 PM", part: "Awarding Ceremony" }
        ]
    },
    {
        date: "July 25",
        year: "2026",
        title: "Centennial Thanksgiving Worship Service",
        description: "The main celebration Sabbath.",
        highlight: true,
        program: [
            { time: "8:30 AM", part: "Sabbath School", note: "Panel Discussion: History of BCSDA" },
            { time: "10:30 AM", part: "Divine Worship Service" },
            { part: "Prelude", person: "Pianist / Orchestra" },
            { part: "Doxology", person: "Congregation" },
            { part: "Invocation", person: "Union President" },
            { part: "Welcome Remarks", person: "Head Elder" },
            { part: "Opening Hymn", note: "'Joy By and By' (Theme Song)" },
            { part: "Scripture Reading", person: "Selected Youth", note: "Psalm 100" },
            { part: "Pastoral Prayer", person: "Mission President" },
            { part: "Tithes & Offerings", person: "Church Treasurer" },
            { part: "Introduction of Speaker" },
            { part: "Special Music", person: "Centennial Grand Choir" },
            { part: "Message", person: "Pr. Ted Wilson (General Conference President)" },
            { part: "Closing Hymn", note: "'We Have This Hope'" },
            { part: "Benediction", person: "Senior Pastor" }
        ]
    },
    {
        date: "July 26",
        year: "2026",
        title: "Family Fun Day",
        description: "Games, food, and fellowship for all ages.",
        program: [
            { time: "8:00 AM", part: "Registration" },
            { time: "9:00 AM", part: "Games Begin" }
        ]
    },
    {
        date: "August 2",
        year: "2026",
        title: "Gift Giving to 100 Families",
        description: "Sharing our blessings with the community.",
        program: [
            { time: "9:00 AM", part: "Distribution" }
        ]
    },
    {
        date: "August 1 - November 8",
        year: "2026",
        title: "100 Days of Prayer (Closing)",
        description: "Closing the year with sustained intercession.",
    }
];
