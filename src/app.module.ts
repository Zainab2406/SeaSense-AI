import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RealtimeModule } from './realtime/realtime.module';
import { CommonModule } from './common/common.module';
import { RedisModule } from './redis/redis.module';
import { configValidationSchema } from './config/config.schema';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VesselsModule } from './vessels/vessels.module';
import { TripsModule } from './trips/trips.module';
import { LocationModule } from './location/location.module';
import { AlertsModule } from './alerts/alerts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    RealtimeModule,
    CommonModule,
    RedisModule,
    AuthModule,
    UsersModule,
    VesselsModule,
    TripsModule,
    LocationModule,
    AlertsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
