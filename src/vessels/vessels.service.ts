import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { Prisma, Vessel } from '@prisma/client';

@Injectable()
export class VesselsService {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.VesselCreateInput): Promise<Vessel> {
        return this.prisma.vessel.create({ data });
    }

    async findAll(): Promise<Vessel[]> {
        return this.prisma.vessel.findMany({
            where: { deletedAt: null },
        });
    }

    async findOne(id: string): Promise<Vessel> {
        const vessel = await this.prisma.vessel.findUnique({
            where: { id },
            include: { trips: { where: { status: 'ACTIVE' } } }
        });
        if (!vessel) throw new NotFoundException(`Vessel with ID ${id} not found`);
        return vessel;
    }

    async update(id: string, data: Prisma.VesselUpdateInput): Promise<Vessel> {
        return this.prisma.vessel.update({
            where: { id },
            data,
        });
    }

    async remove(id: string): Promise<Vessel> {
        return this.prisma.vessel.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
}
