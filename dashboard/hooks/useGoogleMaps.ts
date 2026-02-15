'use client';

import { useEffect, useState } from 'react';
import { importLibrary } from '@googlemaps/js-api-loader';

export const useGoogleMaps = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

        if (!apiKey) {
            setError(new Error('Google Maps API Key is missing. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file.'));
            return;
        }

        const loadLibraries = async () => {
            try {
                // The new functional API handles loading libraries individually
                // We'll load the core 'maps' and 'marker' libraries
                await Promise.all([
                    importLibrary('maps'),
                    importLibrary('marker')
                ]);
                setIsLoaded(true);
            } catch (e) {
                setError(e as Error);
            }
        };

        loadLibraries();
    }, []);

    return { isLoaded, error };
};
