"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LocationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const redis_service_1 = require("../redis/redis.service");
let LocationService = LocationService_1 = class LocationService {
    prisma;
    redis;
    logger = new common_1.Logger(LocationService_1.name);
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
    }
    async recordLocation(data) {
        const point = await this.prisma.locationPoint.create({
            data: {
                tripId: data.tripId,
                latitude: data.latitude,
                longitude: data.longitude,
                speed: data.speed,
                heading: data.heading,
                timestamp: data.timestamp,
            },
        });
        await this.redis.set(`trip:${data.tripId}:latest`, {
            ...data,
            recordedAt: new Date(),
        });
        return point;
    }
    async getLatestForTrip(tripId) {
        return this.redis.get(`trip:${tripId}:latest`);
    }
};
exports.LocationService = LocationService;
exports.LocationService = LocationService = LocationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], LocationService);
//# sourceMappingURL=location.service.js.map