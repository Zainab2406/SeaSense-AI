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
exports.VesselsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let VesselsService = class VesselsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.vessel.create({ data });
    }
    async findAll() {
        return this.prisma.vessel.findMany({
            where: { deletedAt: null },
        });
    }
    async findOne(id) {
        const vessel = await this.prisma.vessel.findUnique({
            where: { id },
            include: { trips: { where: { status: 'ACTIVE' } } }
        });
        if (!vessel)
            throw new common_1.NotFoundException(`Vessel with ID ${id} not found`);
        return vessel;
    }
    async update(id, data) {
        return this.prisma.vessel.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        return this.prisma.vessel.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
};
exports.VesselsService = VesselsService;
exports.VesselsService = VesselsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VesselsService);
//# sourceMappingURL=vessels.service.js.map