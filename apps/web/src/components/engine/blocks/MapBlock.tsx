"use client";

import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionConfig } from "../types";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
);
const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker),
    { ssr: false }
);
const Popup = dynamic(
    () => import("react-leaflet").then((mod) => mod.Popup),
    { ssr: false }
);

export const MapBlock = ({ section }: { section: SectionConfig & { type: "map" } }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Fix Leaflet icon issue in Next.js
        (async () => {
            const L = (await import("leaflet")).default;
            // @ts-ignore
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            });
        })();
    }, []);

    // Batangas City Coordinates
    const position: [number, number] = [13.7565, 121.0583];

    return (
        <section id={section.id} className="py-0 relative h-[600px] w-full bg-background flex flex-col md:flex-row border-y border-white/5">
            {/* Info Overlay / Side Panel */}
            <div className="w-full md:w-1/3 bg-secondary p-12 flex flex-col justify-center order-2 md:order-1 z-10 shadow-2xl relative">
                {/* Decorative border */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-primary/20 rounded-l-full hidden md:block" />

                <div className="space-y-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary mb-4 ring-1 ring-primary/30">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-heading font-bold text-white">{section.title}</h2>
                    <div className="space-y-1">
                        <p className="text-xl font-semibold text-primary">Batangas City SDA Central Church</p>
                        <p className="text-muted-foreground text-lg">P. Burgos Street</p>
                        <p className="text-muted-foreground">Batangas City, Philippines 4200</p>
                    </div>

                    <p className="text-muted-foreground/60 text-sm leading-relaxed">
                        Located in the heart of the city. (OpenStreetMap View).
                    </p>

                    <div className="pt-4 flex gap-4">
                        <Button asChild className="w-full font-bold shadow-lg shadow-primary/10">
                            <a
                                href="https://www.openstreetmap.org/?mlat=13.7565&mlon=121.0583#map=15/13.7565/121.0583"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Open in OSM
                            </a>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Map Frame */}
            <div className="w-full md:w-2/3 h-[400px] md:h-full order-1 md:order-2 bg-muted relative z-0">
                {isMounted && (
                    <MapContainer center={position} zoom={15} style={{ height: "100%", width: "100%" }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        />
                        <Marker position={position}>
                            <Popup>
                                <span className="font-semibold">Batangas City SDA Central Church</span> <br /> See you there!
                            </Popup>
                        </Marker>
                    </MapContainer>
                )}
            </div>
        </section>
    );
};
