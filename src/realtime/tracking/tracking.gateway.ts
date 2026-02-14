import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsePipes, ValidationPipe, Logger } from '@nestjs/common';
import { TrackingEvents, LocationUpdatePayload, SosTriggerPayload } from '../interfaces/tracking.interface';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  namespace: 'tracking',
  cors: { origin: '*' },
})
export class TrackingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private readonly logger = new Logger(TrackingGateway.name);

  constructor(private jwtService: JwtService) { }

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token || client.handshake.headers.authorization?.split(' ')[1];
      if (!token) {
        this.logger.warn(`Client ${client.id} connected without token`);
        client.disconnect();
        return;
      }

      const payload = await this.jwtService.verifyAsync(token);
      client.data.user = payload;

      // Join rooms based on role
      if (payload.role === 'ADMIN' || payload.role === 'OPERATOR') {
        client.join('admin:fleet');
        this.logger.log(`Admin/Operator ${payload.email} joined admin:fleet`);
      }

      this.logger.log(`Client connected: ${client.id}`);
    } catch (e) {
      this.logger.error(`Connection error for client ${client.id}: ${e.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage(TrackingEvents.LOCATION_UPDATE)
  handleLocationUpdate(
    @MessageBody() data: LocationUpdatePayload,
    @ConnectedSocket() client: Socket,
  ) {
    // Broadcast to admins
    this.server.to('admin:fleet').emit(TrackingEvents.VESSEL_LIVE_UPDATE, {
      ...data,
      vesselId: client.data.user.vesselId || data.vesselId, // Prefer vesselId from token if available
    });

    return { status: 'ok' };
  }

  @SubscribeMessage(TrackingEvents.SOS_TRIGGERED)
  handleSos(@MessageBody() data: SosTriggerPayload) {
    this.logger.warn(`SOS Triggered for vessel ${data.vesselId}`);
    this.server.to('admin:fleet').emit(TrackingEvents.SOS_TRIGGERED, data);
  }
}
