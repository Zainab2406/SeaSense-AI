import { PrismaService } from '../common/prisma.service';
import { Trip } from '@prisma/client';
export declare class TripsService {
    private prisma;
    constructor(prisma: PrismaService);
    startTrip(vesselId: string, startTime: Date): Promise<Trip>;
    endTrip(tripId: string, endTime: Date): Promise<Trip>;
    getTripHistory(vesselId: string): Promise<({
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
