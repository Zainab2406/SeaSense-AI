'use client';

import { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    version: 'weekly',
    libraries: ['marker'],
});

export const useGoogleMaps = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // loader.load() returns a Promise. 
        // In newer versions, it might be loadPromise or just load.
        // Based on @googlemaps/js-api-loader documentation, load() is correct.
        (loader as any).load()
            .then(() => setIsLoaded(true))
            .catch((e: Error) => setError(e));
    }, []);

    return { isLoaded, error };
};
