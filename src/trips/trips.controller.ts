import {
    Controller,
    Post,
    Body,
    Param,
    Get,
    UseGuards,
} from '@nestjs/common';
import { TripsService } from './trips.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('trips')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TripsController {
    constructor(private readonly tripsService: TripsService) { }

    @Post(':vesselId/start')
    @Roles('ADMIN', 'OPERATOR')
    startTrip(
        @Param('vesselId') vesselId: string,
        @Body('startTime') startTime: string,
    ) {
        return this.tripsService.startTrip(vesselId, new Date(startTime));
    }

    @Post(':tripId/end')
    @Roles('ADMIN', 'OPERATOR')
    endTrip(
        @Param('tripId') tripId: string,
        @Body('endTime') endTime: string,
    ) {
        return this.tripsService.endTrip(tripId, new Date(endTime));
    }

    @Get('history/:vesselId')
    @Roles('ADMIN', 'OPERATOR', 'VIEWER')
    getHistory(@Param('vesselId') vesselId: string) {
        return this.tripsService.getTripHistory(vesselId);
    }
}
