import { PageConfig } from "./types";
import { HeroBlock } from "./blocks/HeroBlock";
import { TimelineBlock } from "./blocks/TimelineBlock";
import { RsvpBlock } from "./blocks/RsvpBlock";
import { ProgramBlock } from "./blocks/ProgramBlock";
import { MapBlock } from "./blocks/MapBlock";
import { FaqBlock } from "./blocks/FaqBlock";
import { FooterBlock } from "./blocks/FooterBlock";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { Header } from "@/components/layout/Header";

export const PageRenderer = ({ config }: { config: PageConfig }) => {
    return (
        <main className="min-h-screen bg-background text-foreground relative">
            <Header />
            <AudioPlayer />
            {config.sections.map((section, idx) => {
                if (section.isVisible === false) return null;

                switch (section.type) {
                    case "hero":
                        return <HeroBlock key={section.id} section={section} />;
                    case "timeline":
                        return <TimelineBlock key={section.id} section={section} />;
                    case "program":
                        // @ts-ignore
                        return <ProgramBlock key={section.id} section={section} />;
                    case "map":
                        // @ts-ignore
                        return <MapBlock key={section.id} section={section} />;
                    case "faq":
                        // @ts-ignore
                        return <FaqBlock key={section.id} section={section} />;
                    case "footer":
                        // @ts-ignore
                        return <FooterBlock key={section.id} section={section} />;
                    case "rsvp":
                        return <RsvpBlock key={section.id} section={section} />;
                    default:
                        return (
                            <div key={section.id} className="p-8 text-center text-red-500 border border-dashed border-red-500 my-8">
                                Unknown Section Type: {(section as any).type}
                            </div>
                        );
                }
            })}
        </main>
    );
};
