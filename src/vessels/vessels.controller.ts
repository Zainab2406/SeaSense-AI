import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { VesselsService } from './vessels.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Prisma } from '@prisma/client';

@Controller('vessels')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VesselsController {
    constructor(private readonly vesselsService: VesselsService) { }

    @Post()
    @Roles('ADMIN', 'OPERATOR')
    create(@Body() createVesselDto: Prisma.VesselCreateInput) {
        return this.vesselsService.create(createVesselDto);
    }

    @Get()
    @Roles('ADMIN', 'OPERATOR', 'VIEWER')
    findAll() {
        return this.vesselsService.findAll();
    }

    @Get(':id')
    @Roles('ADMIN', 'OPERATOR', 'VIEWER')
    findOne(@Param('id') id: string) {
        return this.vesselsService.findOne(id);
    }

    @Patch(':id')
    @Roles('ADMIN', 'OPERATOR')
    update(@Param('id') id: string, @Body() updateVesselDto: Prisma.VesselUpdateInput) {
        return this.vesselsService.update(id, updateVesselDto);
    }

    @Delete(':id')
    @Roles('ADMIN')
    remove(@Param('id') id: string) {
        return this.vesselsService.remove(id);
    }
}
