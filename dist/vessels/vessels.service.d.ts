import { PrismaService } from '../common/prisma.service';
import { Prisma, Vessel } from '@prisma/client';
export declare class VesselsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.VesselCreateInput): Promise<Vessel>;
    findAll(): Promise<Vessel[]>;
    findOne(id: string): Promise<Vessel>;
    update(id: string, data: Prisma.VesselUpdateInput): Promise<Vessel>;
    remove(id: string): Promise<Vessel>;
}
