import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehiclesService {
    constructor(private readonly prisma: PrismaService){}

    async findAll(){
        return this.prisma.vehicle.findMany({
            include: {
                customer: true,
            }
        })
    }

    async createVehicle(createVehicleDto: CreateVehicleDto){
        return this.prisma.vehicle.create({
            data: createVehicleDto
        })
    }
}
