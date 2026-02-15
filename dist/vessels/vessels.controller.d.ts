import { VesselsService } from './vessels.service';
import { Prisma } from '@prisma/client';
export declare class VesselsController {
    private readonly vesselsService;
    constructor(vesselsService: VesselsService);
    create(createVesselDto: Prisma.VesselCreateInput): Promise<{
        type: import(".prisma/client").$Enums.VesselType;
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        imo: string;
        mmsi: string;
        flag: string | null;
    }>;
    findAll(): Promise<{
        type: import(".prisma/client").$Enums.VesselType;
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        imo: string;
        mmsi: string;
        flag: string | null;
    }[]>;
    findOne(id: string): Promise<{
        type: import(".prisma/client").$Enums.VesselType;
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        imo: string;
        mmsi: string;
        flag: string | null;
    }>;
    update(id: string, updateVesselDto: Prisma.VesselUpdateInput): Promise<{
        type: import(".prisma/client").$Enums.VesselType;
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        imo: string;
        mmsi: string;
        flag: string | null;
    }>;
    remove(id: string): Promise<{
        type: import(".prisma/client").$Enums.VesselType;
        name: string;
        id: string;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        imo: string;
        mmsi: string;
        flag: string | null;
    }>;
}
