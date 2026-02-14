import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { RealtimeModule } from '../realtime/realtime.module';
import { CommonModule } from '../common/common.module';

@Module({
    imports: [RealtimeModule, CommonModule],
    providers: [AlertsService],
    exports: [AlertsService],
})
export class AlertsModule { }
