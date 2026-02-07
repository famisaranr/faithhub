export type SectionType = "hero" | "timeline" | "rsvp" | "faq" | "content" | "map" | "program" | "footer";

export interface ButtonAction {
    label: string;
    url: string;
    variant?: "default" | "secondary" | "outline" | "ghost";
}

export interface BaseSection {
    id: string;
    type: SectionType;
    isVisible?: boolean;
    theme?: "light" | "dark" | "gold"; // Section specific overrides
}

export interface HeroSection extends BaseSection {
    type: "hero";
    title: string;
    subtitle?: string;
    backgroundImage?: string;
    actions?: ButtonAction[];
    countdownTarget?: string; // ISO Date
}

export interface TimelineItem {
    year: string;
    title: string;
    description: string;
    image?: string;
}

export interface TimelineSection extends BaseSection {
    type: "timeline";
    title: string;
    items: TimelineItem[];
}

export interface RsvpSection extends BaseSection {
    type: "rsvp";
    title: string;
    description?: string;
    eventId: string; // To link to the correct DB event
}

export interface MapSection extends BaseSection {
    type: "map";
    title: string;
    description?: string;
}

export interface ProgramSection extends BaseSection {
    type: "program";
    title: string;
    description?: string;
}

export interface FaqSection extends BaseSection {
    type: "faq";
    title: string;
    description?: string;
}

export interface FooterSection extends BaseSection {
    type: "footer";
    title: string;
}

export type SectionConfig = HeroSection | TimelineSection | RsvpSection | MapSection | ProgramSection | FaqSection | FooterSection;

export interface PageConfig {
    title: string;
    description: string;
    sections: SectionConfig[];
    branding: {
        primaryColor: string;
        secondaryColor: string;
        fontHeading: string;
    };
}
