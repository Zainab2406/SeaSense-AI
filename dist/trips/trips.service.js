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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let TripsService = class TripsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async startTrip(vesselId, startTime) {
        const activeTrip = await this.prisma.trip.findFirst({
            where: { vesselId, status: 'ACTIVE' },
        });
        if (activeTrip) {
            throw new common_1.BadRequestException('Vessel already has an active trip');
        }
        return this.prisma.trip.create({
            data: {
                vesselId,
                status: 'ACTIVE',
                startTime,
            },
        });
    }
    async endTrip(tripId, endTime) {
        const trip = await this.prisma.trip.findUnique({ where: { id: tripId } });
        if (!trip)
            throw new common_1.NotFoundException('Trip not found');
        return this.prisma.trip.update({
            where: { id: tripId },
            data: {
                status: 'COMPLETED',
                endTime,
            },
        });
    }
    async getTripHistory(vesselId) {
        return this.prisma.trip.findMany({
            where: { vesselId },
            include: { points: { orderBy: { timestamp: 'asc' } } },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.TripsService = TripsService;
exports.TripsService = TripsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TripsService);
//# sourceMappingURL=trips.service.js.map