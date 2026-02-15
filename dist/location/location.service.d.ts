import { PrismaService } from '../common/prisma.service';
import { RedisService } from '../redis/redis.service';
import { LocationUpdatePayload } from '../realtime/interfaces/tracking.interface';
export declare class LocationService {
    private prisma;
    private redis;
    private readonly logger;
    constructor(prisma: PrismaService, redis: RedisService);
    recordLocation(data: LocationUpdatePayload): Promise<{
        id: string;
        timestamp: Date;
        tripId: string;
        latitude: number;
        longitude: number;
        speed: number | null;
        heading: number | null;
    }>;
    getLatestForTrip(tripId: string): Promise<unknown>;
}
