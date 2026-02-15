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
var AlertsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
const tracking_gateway_1 = require("../realtime/tracking/tracking.gateway");
let AlertsService = AlertsService_1 = class AlertsService {
    prisma;
    gateway;
    logger = new common_1.Logger(AlertsService_1.name);
    constructor(prisma, gateway) {
        this.prisma = prisma;
        this.gateway = gateway;
    }
    async createAlert(vesselId, severity, message, type = 'GENERAL') {
        const alert = await this.prisma.alert.create({
            data: {
                vesselId,
                severity,
                message,
                type,
                status: 'ACTIVE',
            },
        });
        this.gateway.server.to('admin:fleet').emit('new_alert', alert);
        return alert;
    }
    async resolveAlert(alertId) {
        return this.prisma.alert.update({
            where: { id: alertId },
            data: { status: 'RESOLVED', resolvedAt: new Date() },
        });
    }
    async checkGeofence(vesselId, lat, lng) {
        this.logger.debug(`Checking geofence for vessel ${vesselId} at ${lat}, ${lng}`);
    }
};
exports.AlertsService = AlertsService;
exports.AlertsService = AlertsService = AlertsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        tracking_gateway_1.TrackingGateway])
], AlertsService);
//# sourceMappingURL=alerts.service.js.map