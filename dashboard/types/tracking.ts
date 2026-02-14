export interface Vessel {
    id: string;
    name: string;
    imo: string;
    mmsi: string;
    type: string;
    status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
}

export interface LocationPoint {
    tripId: string;
    vesselId: string;
    latitude: number;
    longitude: number;
    speed: number;
    heading: number;
    timestamp: string;
}

export interface VesselLiveUpdate extends LocationPoint {
    status: string;
}

export enum TrackingEvents {
    LOCATION_UPDATE = 'location_update',
    SOS_TRIGGERED = 'sos_triggered',
    VESSEL_LIVE_UPDATE = 'vessel_live_update',
    SUBSCRIPTION_SUCCESS = 'subscription_success',
}
