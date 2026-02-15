import { TripsService } from './trips.service';
export declare class TripsController {
    private readonly tripsService;
    constructor(tripsService: TripsService);
    startTrip(vesselId: string, startTime: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.TripStatus;
        startTime: Date | null;
        endTime: Date | null;
        vesselId: string;
    }>;
    endTrip(tripId: string, endTime: string): Promise<{
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.TripStatus;
        startTime: Date | null;
        endTime: Date | null;
        vesselId: string;
    }>;
    getHistory(vesselId: string): Promise<({
        points: {
            id: string;
            timestamp: Date;
            tripId: string;
            latitude: number;
            longitude: number;
            speed: number | null;
            heading: number | null;
        }[];
    } & {
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.TripStatus;
        startTime: Date | null;
        endTime: Date | null;
        vesselId: string;
    })[]>;
}
