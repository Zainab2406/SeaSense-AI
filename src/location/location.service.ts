import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { RedisService } from '../redis/redis.service';
import { LocationUpdatePayload } from '../realtime/interfaces/tracking.interface';

@Injectable()
export class LocationService {
    private readonly logger = new Logger(LocationService.name);

    constructor(
        private prisma: PrismaService,
        private redis: RedisService,
    ) { }

    async recordLocation(data: LocationUpdatePayload) {
        // 1. Persist to DB
        const point = await this.prisma.locationPoint.create({
            data: {
                tripId: data.tripId,
                latitude: data.latitude,
                longitude: data.longitude,
                speed: data.speed,
                heading: data.heading,
                timestamp: data.timestamp,
                // geom handled by raw query if needed for spatial index
            },
        });

        // 2. Cache latest in Redis
        await this.redis.set(`trip:${data.tripId}:latest`, {
            ...data,
            recordedAt: new Date(),
        });

        return point;
    }

    async getLatestForTrip(tripId: string) {
        return this.redis.get(`trip:${tripId}:latest`);
    }
}
