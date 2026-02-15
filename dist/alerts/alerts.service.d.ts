import { PrismaService } from '../common/prisma.service';
import { TrackingGateway } from '../realtime/tracking/tracking.gateway';
import { AlertSeverity } from '@prisma/client';
export declare class AlertsService {
    private prisma;
    private gateway;
    private readonly logger;
    constructor(prisma: PrismaService, gateway: TrackingGateway);
    createAlert(vesselId: string, severity: AlertSeverity, message: string, type?: string): Promise<{
        message: string;
        type: string;
        id: string;
        status: import(".prisma/client").$Enums.AlertStatus;
        vesselId: string;
        severity: import(".prisma/client").$Enums.AlertSeverity;
        timestamp: Date;
        resolvedAt: Date | null;
        tripId: string | null;
        zoneId: string | null;
    }>;
    resolveAlert(alertId: string): Promise<{
        message: string;
        type: string;
        id: string;
        status: import(".prisma/client").$Enums.AlertStatus;
        vesselId: string;
        severity: import(".prisma/client").$Enums.AlertSeverity;
        timestamp: Date;
        resolvedAt: Date | null;
        tripId: string | null;
        zoneId: string | null;
    }>;
    checkGeofence(vesselId: string, lat: number, lng: number): Promise<void>;
}
