import { useState, useEffect } from 'react';
import { SabbathStage } from '../types';

export const useSabbathProtocol = () => {
    const [stage, setStage] = useState<SabbathStage | null>(null);

    useEffect(() => {
        const checkTime = () => {
            const now = new Date();
            const day = now.getDay(); // 0 is Sunday, 5 is Friday
            const hours = now.getHours();
            const minutes = now.getMinutes();

            // For testing: Uncomment to simulate specific times
            // now.setHours(17, 56); // Example: 5:56 PM (Warning)

            // Target: Friday at 6:00 PM (18:00)
            // If it's not Friday, or if it's past Friday 6PM (and not Saturday), we might not be in "protocol mode"
            // But let's simplify: 
            // - If it's Friday, track approach to 18:00
            // - If it's Saturday, maybe stay in 'sabbath' mode until 18:00

            if (day === 5) { // Friday
                const sunsetTime = new Date(now);
                sunsetTime.setHours(18, 0, 0, 0);

                const diffCheck = sunsetTime.getTime() - now.getTime();
                const diffMinutes = Math.floor(diffCheck / (1000 * 60));

                if (diffMinutes <= 0) {
                    setStage('sabbath'); // It's past 6 PM on Friday
                } else if (diffMinutes <= 5) {
                    setStage('warning');
                } else if (diffMinutes <= 18) {
                    setStage('ready');
                } else if (diffMinutes <= 30) {
                    setStage('prep');
                } else {
                    setStage(null);
                }
            } else if (day === 6) {
                // Saturday
                const sunsetTime = new Date(now);
                sunsetTime.setHours(18, 0, 0, 0);
                if (now < sunsetTime) {
                    setStage('sabbath');
                } else {
                    setStage(null);
                }
            } else {
                setStage(null);
            }
        };

        checkTime(); // Check immediately
        const timer = setInterval(checkTime, 30 * 1000); // Check every 30 seconds

        return () => clearInterval(timer);
    }, []);

    return stage;
};
