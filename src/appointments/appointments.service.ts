import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
    constructor(private readonly prisma: PrismaService) { }


    async findAll(){
        return this.prisma.appointment.findMany()
    }

    async createAppointment(createAppointmentDto: CreateAppointmentDto) {
        const year = new Date().getFullYear();

        const result = await this.prisma.$transaction(async (tx) => {
            const counter = await tx.appointmentCounter.upsert({
                where: { year },
                update: { lastNumber: { increment: 1 } },
                create: { year, lastNumber: 1 },
            });

            const reference = `RDV-${year}-${counter.lastNumber}`;

            return tx.appointment.create({
                data: {
                    reference,
                    date: new Date(createAppointmentDto.date),
                    time: createAppointmentDto.time,
                    idCustomer: createAppointmentDto.idCustomer,
                    idVehicle: createAppointmentDto.idVehicle,
                    type: createAppointmentDto.type,
                },

            });
        });

        return result;
    }
}
