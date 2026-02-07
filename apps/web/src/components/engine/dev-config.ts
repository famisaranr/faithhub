import { PageConfig } from "./types";

export const DEV_CENTENNIAL_CONFIG: PageConfig = {
    title: "100 Years of Grace",
    description: "Batangas City SDA Church Centennial Celebration",
    branding: {
        primaryColor: "#d4af37",
        secondaryColor: "#0c1220",
        fontHeading: "Playfair Display",
    },
    sections: [
        {
            id: "home",
            type: "hero",
            title: "Faithful Through the Ages: Celebrating 100 Years of God’s Grace",
            subtitle: "Celebrating a century of faith, hope, and community in Batangas City.",
            countdownTarget: "2026-07-25T08:30:00+08:00", // July 25, 2026 8:30 AM Phil Time
            backgroundImage: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2673&auto=format&fit=crop",
            actions: [
                { label: "Book Your Seat", url: "#rsvp", variant: "default" },
                { label: "Our History", url: "#history", variant: "outline" }
            ]
        },
        {
            id: "history",
            type: "timeline",
            title: "Our Journey",
            items: [
                {
                    year: "1926",
                    title: "The Beginning",
                    description: "The first Sabbath School was held in a small house near the glorious Calumpang River.",
                    image: "https://images.unsplash.com/photo-1577726353930-1017e85743c6?q=80&w=2574&auto=format&fit=crop"
                },
                {
                    year: "1950",
                    title: "First Church Built",
                    description: "Through the sacrifice of the pioneers, the first wooden chapel was dedicated to the Lord."
                }
            ]
        },
        {
            id: "program",
            // @ts-ignore
            type: "program",
            title: "Centennial Weekend Program",
            description: "Join us for a weekend of celebration, worship, and fellowship."
        },
        {
            id: "venue",
            // @ts-ignore
            type: "map",
            title: "How To Get There",
        },
        {
            id: "faq",
            // @ts-ignore
            type: "faq",
            title: "FAQ",
            description: "Information for our guests."
        },
        {
            id: "rsvp",
            type: "rsvp",
            title: "Confirm Your Attendance",
            description: "We are expecting over 500 guests. Please confirm your attendance by December 31, 2025.",
            eventId: "evt_123456"
        },
        {
            id: "footer-1",
            // @ts-ignore
            type: "footer",
            title: "Footer",
        }
    ]
};
