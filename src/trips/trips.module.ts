import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { LocationService } from './location.service';
import { AlertsService } from './alerts.service';

@Module({
  providers: [TripsService, LocationService, AlertsService],
  controllers: [TripsController]
})
export class TripsModule {}
