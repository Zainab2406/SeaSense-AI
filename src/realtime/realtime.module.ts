import { Module } from '@nestjs/common';
import { TrackingGateway } from './tracking/tracking.gateway';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'secret',
        signOptions: {
          expiresIn: (configService.get<string>('JWT_EXPIRATION') || '24h') as any
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [TrackingGateway],
  exports: [TrackingGateway],
})
export class RealtimeModule { }
