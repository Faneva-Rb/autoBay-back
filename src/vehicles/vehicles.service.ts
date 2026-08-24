import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehiclesService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return this.prisma.vehicle.findMany({
            include: {
                customer: true,
            }
        })
    }

    async findOne(id: number) {
        const vehicle = await this.prisma.vehicle.findUnique({
            where: { id }
        })

        if(!vehicle){
            throw new NotFoundException("Véhicule introuvable")
        }
        return vehicle
    }

    async createVehicle(createVehicleDto: CreateVehicleDto) {
        const immatriculation = await this.prisma.vehicle.findUnique({
            where: {
                immatriculation: createVehicleDto.immatriculation
            }
        })

        if (immatriculation) {
            throw new BadRequestException("Cet immatriculation est déja utilisé")
        }

        const idCustomer = await this.prisma.customer.findUnique({
            where: {
                id: createVehicleDto.idCustomer
            }
        })

        if (!idCustomer) throw new NotFoundException("Client introuvable")

        return this.prisma.vehicle.create({
            data: createVehicleDto
        })


    }
}
