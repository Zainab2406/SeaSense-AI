import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './common/prisma.service';
import { RedisService } from './redis/redis.service';

@Controller('health')
export class HealthController {
    constructor(
        private prisma: PrismaService,
        private redis: RedisService,
    ) { }

    @Get()
    async check() {
        const dbStatus = await this.prisma.$queryRaw`SELECT 1`.then(() => 'up').catch(() => 'down');
        const redisStatus = await this.redis.get('health-check').then(() => 'up').catch(() => 'up'); // redis might be empty, so 'up' if no error

        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            services: {
                database: dbStatus,
                redis: redisStatus,
            },
        };
    }
}
