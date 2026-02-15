export declare class LocationUpdatePayload {
    vesselId: string;
    tripId: string;
    latitude: number;
    longitude: number;
    speed: number;
    heading: number;
    timestamp: Date;
}
export declare class SosTriggerPayload {
    vesselId: string;
    tripId: string;
    message?: string;
    timestamp: Date;
}
export interface VesselLiveUpdate {
    vesselId: string;
    tripId: string;
    location: {
        lat: number;
        lng: number;
    };
    speed: number;
    heading: number;
    status: 'ACTIVE' | 'SOS';
    lastSeen: Date;
}
export declare enum TrackingEvents {
    TRIP_STARTED = "trip_started",
    LOCATION_UPDATE = "location_update",
    TRIP_ENDED = "trip_ended",
    SOS_TRIGGERED = "sos_triggered",
    VESSEL_LIVE_UPDATE = "vessel_live_update"
}
