import { PrismaService } from './common/prisma.service';
import { RedisService } from './redis/redis.service';
export declare class HealthController {
    private prisma;
    private redis;
    constructor(prisma: PrismaService, redis: RedisService);
    check(): Promise<{
        status: string;
        timestamp: string;
        services: {
            database: string;
            redis: string;
        };
    }>;
}
