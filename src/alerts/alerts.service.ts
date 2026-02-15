import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { TrackingGateway } from '../realtime/tracking/tracking.gateway';
import { AlertSeverity } from '@prisma/client';

@Injectable()
export class AlertsService {
    private readonly logger = new Logger(AlertsService.name);

    constructor(
        private prisma: PrismaService,
        private gateway: TrackingGateway,
    ) { }

    async createAlert(vesselId: string, severity: AlertSeverity, message: string, type: string = 'GENERAL') {
        const alert = await this.prisma.alert.create({
            data: {
                vesselId,
                severity,
                message,
                type,
                status: 'ACTIVE',
            },
        });

        // Notify real-time clients
        this.gateway.server.to('admin:fleet').emit('new_alert', alert);

        return alert;
    }

    async resolveAlert(alertId: string) {
        return this.prisma.alert.update({
            where: { id: alertId },
            data: { status: 'RESOLVED', resolvedAt: new Date() },
        });
    }

    async checkGeofence(vesselId: string, lat: number, lng: number) {
        // Basic logic for now, could use PostGIS ST_Contains
        // Placeholder for geofencing logic
        this.logger.debug(`Checking geofence for vessel ${vesselId} at ${lat}, ${lng}`);
    }
}
