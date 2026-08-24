import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { JwtAuthGuad } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/generated/prisma/enums';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('vehicles')
@UseGuards(JwtAuthGuad, RolesGuard)
@Roles(Role.RECEPTIONIST)
export class VehiclesController {
    constructor(private readonly vehiclesService: VehiclesService){}


    @Get()
    findAll(){
        return this.vehiclesService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.vehiclesService.findOne(+id)
    }

    @Post()
    create(@Body() createVehicleDto: CreateVehicleDto){
        return this.vehiclesService.createVehicle(createVehicleDto)
    }
}
