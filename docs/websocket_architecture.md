# WebSocket Architecture Design

## Overview
The real-time tracking system uses NestJS WebSockets with Socket.IO and a Redis adapter for horizontal scaling. It handles trip lifecycle events and live location broadcasting.

## Event Contracts (TypeScript)

```typescript
// Client to Server
interface LocationUpdatePayload {
  tripId: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  timestamp: string;
}

interface SosTriggerPayload {
  tripId: string;
  message?: string;
}

// Server to Client (Admin/Operator)
interface VesselLiveUpdate {
  vesselId: string;
  tripId: string;
  location: {
    lat: number;
    lng: number;
  };
  speed: number;
  status: 'ACTIVE' | 'SOS';
}
```

## Redis Caching Logic
- **Key Strategy**: `vessel:{vesselId}:latest_location`
- **Data Structure**: Redis Hash or JSON string.
- **TTL**: Should persist for at least the duration of the trip + some buffer (e.g., 24 hours).
- **Usage**: When an Admin dashboard loads, it fetches the latest positions of all active vessels from Redis instead of hitting the PostgreSQL database for every point.

## Security Considerations
- **Authentication**: JWT validation in the `handleConnection` or using a dedicated `WsGuard`.
- **Authorization**: Separate "rooms" for different roles.
  - `fishermen:{userId}`: Personal notifications.
  - `vessel:{vesselId}`: Updates specific to a vessel.
  - `admin:fleet`: Global fleet updates.
- **Input Validation**: Use `ValidationPipe` with `@nestjs/websockets` to validate incoming payloads.

## Scaling Considerations
- **Socket.IO Redis Adapter**: Critical for multi-pod deployments. If a fisherman is connected to Instance A and an Admin to Instance B, the Redis adapter broadcasts the `vessel_live_update` across all instances.
- **Sticky Sessions**: Required at the Load Balancer layer (e.g., NGINX/ALB ip_hash) because Socket.IO starts with HTTP long-polling before upgrading.

## Gateway Structure (Pseudo-code)

```typescript
@WebSocketGateway({
  cors: { origin: '*' },
  namespace: 'tracking',
})
export class TrackingGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  async handleConnection(client: Socket) {
    const user = await this.authenticate(client);
    if (!user) return client.disconnect();
    
    // Join appropriate rooms
    if (user.role === 'ADMIN') client.join('admin:fleet');
    if (user.vesselId) client.join(`vessel:${user.vesselId}`);
  }

  @SubscribeMessage('location_update')
  async handleLocationUpdate(client: Socket, payload: LocationUpdatePayload) {
    // 1. Validate payload
    // 2. Cache in Redis
    // 3. Queue for DB persistence (async)
    // 4. Broadcast to Admin room
    this.server.to('admin:fleet').emit('vessel_live_update', transformation);
  }

  @SubscribeMessage('sos_triggered')
  async handleSos(client: Socket, payload: SosTriggerPayload) {
    // Immediate broadcast to all operators
    this.server.to('admin:fleet').emit('sos_alert', alertData);
  }
}
```

## Heartbeat & Rate Limiting
- **Heartbeat**: Socket.IO has built-in `pingTimeouts` and `pingIntervals`.
- **Rate Limiting**: Implement a custom decorator or interceptor that uses Redis to track message counts per `clientId` per second. Reject messages if threshold is exceeded.
