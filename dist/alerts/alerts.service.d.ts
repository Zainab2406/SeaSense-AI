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
        severity: import(".prisma/client").$Enums.AlertSeverity;
        status: import(".prisma/client").$Enums.AlertStatus;
        timestamp: Date;
        resolvedAt: Date | null;
        tripId: string | null;
        zoneId: string | null;
        vesselId: string;
    }>;
    resolveAlert(alertId: string): Promise<{
        message: string;
        type: string;
        id: string;
        severity: import(".prisma/client").$Enums.AlertSeverity;
        status: import(".prisma/client").$Enums.AlertStatus;
        timestamp: Date;
        resolvedAt: Date | null;
        tripId: string | null;
        zoneId: string | null;
        vesselId: string;
    }>;
    checkGeofence(vesselId: string, lat: number, lng: number): Promise<void>;
}
