import { LocationService } from './location.service';
import { LocationUpdatePayload } from '../realtime/interfaces/tracking.interface';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    recordLocation(data: LocationUpdatePayload): Promise<{
        id: string;
        timestamp: Date;
        tripId: string;
        latitude: number;
        longitude: number;
        speed: number | null;
        heading: number | null;
    }>;
    getLatest(tripId: string): Promise<unknown>;
}
