import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateAppointmentDto } from './create-appointment.dto';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuad } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/generated/prisma/enums';

@Controller('appointments')
@UseGuards(JwtAuthGuad, RolesGuard)
@Roles(Role.RECEPTIONIST)
export class AppointmentsController {
    constructor(private readonly appointmentService: AppointmentsService){}


    @Get()
    findAll(){
        return this.appointmentService.findAll()
    }

    @Post()
    create(@Body() dto: CreateAppointmentDto){
        return this.appointmentService.createAppointment(dto)
    }

}
