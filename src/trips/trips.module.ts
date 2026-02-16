import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { LocationModule } from '../location/location.module';
import { AlertsModule } from '../alerts/alerts.module';

@Module({
  imports: [LocationModule, AlertsModule],
  providers: [TripsService],
  controllers: [TripsController],
})
export class TripsModule { }
