import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LocationUpdatePayload, SosTriggerPayload } from '../interfaces/tracking.interface';
import { JwtService } from '@nestjs/jwt';
export declare class TrackingGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private jwtService;
    server: Server;
    private readonly logger;
    constructor(jwtService: JwtService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleLocationUpdate(data: LocationUpdatePayload, client: Socket): {
        status: string;
    };
    handleSos(data: SosTriggerPayload): void;
}
