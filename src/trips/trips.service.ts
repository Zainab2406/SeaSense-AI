import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { Trip, Prisma } from '@prisma/client';

@Injectable()
export class TripsService {
    constructor(private prisma: PrismaService) { }

    async startTrip(vesselId: string, startTime: Date): Promise<Trip> {
        const activeTrip = await this.prisma.trip.findFirst({
            where: { vesselId, status: 'ACTIVE' },
        });

        if (activeTrip) {
            throw new BadRequestException('Vessel already has an active trip');
        }

        return this.prisma.trip.create({
            data: {
                vesselId,
                status: 'ACTIVE',
                startTime,
            },
        });
    }

    async endTrip(tripId: string, endTime: Date): Promise<Trip> {
        const trip = await this.prisma.trip.findUnique({ where: { id: tripId } });
        if (!trip) throw new NotFoundException('Trip not found');

        return this.prisma.trip.update({
            where: { id: tripId },
            data: {
                status: 'COMPLETED',
                endTime,
            },
        });
    }

    async getTripHistory(vesselId: string) {
        return this.prisma.trip.findMany({
            where: { vesselId },
            include: { points: { orderBy: { timestamp: 'asc' } } },
            orderBy: { createdAt: 'desc' },
        });
    }
}
