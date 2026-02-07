'use client';

import { useEffect } from 'react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Global Error:', error);
    }, [error]);

    return (
        <html>
            <body>
                <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center font-sans">
                    <h2 className="text-2xl font-bold mb-4">Critical Error</h2>
                    <p className="mb-4 text-gray-600">
                        A critical error occurred in the application.
                        {error.digest && <span className="block text-xs mt-2 text-gray-400">Digest: {error.digest}</span>}
                    </p>
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        onClick={() => reset()}
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
