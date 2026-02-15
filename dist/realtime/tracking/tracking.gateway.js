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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TrackingGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const tracking_interface_1 = require("../interfaces/tracking.interface");
const jwt_1 = require("@nestjs/jwt");
let TrackingGateway = TrackingGateway_1 = class TrackingGateway {
    jwtService;
    server;
    logger = new common_1.Logger(TrackingGateway_1.name);
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth.token || client.handshake.headers.authorization?.split(' ')[1];
            if (!token) {
                this.logger.warn(`Client ${client.id} connected without token`);
                client.disconnect();
                return;
            }
            const payload = await this.jwtService.verifyAsync(token);
            client.data.user = payload;
            if (payload.role === 'ADMIN' || payload.role === 'OPERATOR') {
                client.join('admin:fleet');
                this.logger.log(`Admin/Operator ${payload.email} joined admin:fleet`);
            }
            this.logger.log(`Client connected: ${client.id}`);
        }
        catch (e) {
            this.logger.error(`Connection error for client ${client.id}: ${e.message}`);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleLocationUpdate(data, client) {
        this.server.to('admin:fleet').emit(tracking_interface_1.TrackingEvents.VESSEL_LIVE_UPDATE, {
            ...data,
            vesselId: client.data.user.vesselId || data.vesselId,
        });
        return { status: 'ok' };
    }
    handleSos(data) {
        this.logger.warn(`SOS Triggered for vessel ${data.vesselId}`);
        this.server.to('admin:fleet').emit(tracking_interface_1.TrackingEvents.SOS_TRIGGERED, data);
    }
};
exports.TrackingGateway = TrackingGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], TrackingGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, websockets_1.SubscribeMessage)(tracking_interface_1.TrackingEvents.LOCATION_UPDATE),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tracking_interface_1.LocationUpdatePayload,
        socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], TrackingGateway.prototype, "handleLocationUpdate", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(tracking_interface_1.TrackingEvents.SOS_TRIGGERED),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tracking_interface_1.SosTriggerPayload]),
    __metadata("design:returntype", void 0)
], TrackingGateway.prototype, "handleSos", null);
exports.TrackingGateway = TrackingGateway = TrackingGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: 'tracking',
        cors: { origin: '*' },
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], TrackingGateway);
//# sourceMappingURL=tracking.gateway.js.map