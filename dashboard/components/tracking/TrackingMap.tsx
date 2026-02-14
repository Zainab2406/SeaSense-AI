'use client';

import { useEffect, useRef } from 'react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { useVesselStore } from '../../store/useVesselStore';

interface TrackingMapProps {
    className?: string;
}

export const TrackingMap = ({ className }: TrackingMapProps) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const googleMapRef = useRef<google.maps.Map | null>(null);
    const markersRef = useRef<Record<string, google.maps.marker.AdvancedMarkerElement>>({});
    const { isLoaded, error } = useGoogleMaps();
    const livePositions = useVesselStore((state) => state.livePositions);
    const selectVessel = useVesselStore((state) => state.selectVessel);

    useEffect(() => {
        if (isLoaded && mapRef.current && !googleMapRef.current) {
            googleMapRef.current = new google.maps.Map(mapRef.current, {
                center: { lat: 25.276987, lng: 55.296249 },
                zoom: 10,
                mapId: 'DEMO_MAP_ID',
                backgroundColor: '#0f172a',
                disableDefaultUI: false,
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: true,
            });
        }
    }, [isLoaded]);

    useEffect(() => {
        if (!googleMapRef.current || !isLoaded) return;

        Object.entries(livePositions).forEach(([vesselId, position]) => {
            let marker = markersRef.current[vesselId];

            if (!marker) {
                const pin = document.createElement('div');
                pin.className = 'vessel-marker-container';
                pin.innerHTML = `
          <div class="vessel-icon" style="transform: rotate(${position.heading}deg)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L19 21L12 17L5 21L12 2Z" fill="#3b82f6" stroke="white" stroke-width="2" stroke-linejoin="round"/>
            </svg>
          </div>
        `;

                marker = new google.maps.marker.AdvancedMarkerElement({
                    map: googleMapRef.current,
                    position: { lat: position.latitude, lng: position.longitude },
                    title: `Vessel: ${vesselId}`,
                    content: pin,
                });

                marker.addListener('click', () => {
                    selectVessel(vesselId);
                });

                markersRef.current[vesselId] = marker;
            } else {
                marker.position = { lat: position.latitude, lng: position.longitude };
                const iconElement = (marker.content as HTMLElement).querySelector('.vessel-icon') as HTMLElement;
                if (iconElement) {
                    iconElement.style.transform = `rotate(${position.heading}deg)`;
                }
            }
        });
    }, [livePositions, isLoaded, selectVessel]);

    if (error) return (
        <div className="flex items-center justify-center w-full h-full bg-slate-950 text-red-500">
            <div className="text-center p-8 bg-slate-900 rounded-lg border border-red-900/50 shadow-2xl">
                <h3 className="text-lg font-bold mb-2">Map Loading Error</h3>
                <p className="text-sm opacity-80">{error.message}</p>
            </div>
        </div>
    );

    if (!isLoaded) return (
        <div className="flex items-center justify-center w-full h-full bg-slate-950">
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full" />
                    <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
                <p className="text-slate-400 font-medium animate-pulse text-xs tracking-widest uppercase mt-2">Initializing Maritime View</p>
            </div>
        </div>
    );

    return (
        <div className={`relative w-full h-full ${className} bg-slate-900 overflow-hidden shadow-inner`}>
            <div ref={mapRef} className="w-full h-full grayscale-[25%] contrast-[110%] brightness-[85%]" />

            <style jsx global>{`
        .vessel-marker-container {
          position: relative;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .vessel-icon {
          display: flex;
          align-items: center;
          justify-center: center;
          filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.6));
          transition: transform 0.5s estate;
        }
        .vessel-marker-container:hover .vessel-icon {
          filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.8));
          transform: scale(1.2) !important;
        }
      `}</style>
        </div>
    );
};
