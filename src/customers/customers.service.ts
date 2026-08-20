import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return this.prisma.customer.findMany({
            include: {
                vehicle: true
            }
        })
    }

    async findOne(id: number) {
        return this.prisma.customer.findUnique({
            where: {
                id
            }
        })
    }

    async createCustomer(createCustomerDto: CreateCustomerDto) {
        return this.prisma.customer.create({
            data: createCustomerDto
        })
    }

    async udpateCustomer(id: number, updateCustomerDto: UpdateCustomerDto){
        const customerId = await this.findOne(id)
        if(!customerId) throw new NotFoundException("Client introuvable")
        
        return this.prisma.customer.update({
            where: { id },
            data: updateCustomerDto
        })
    }

    async removeCustomer(id: number) {
        return this.prisma.customer.delete({
            where: { id }
        })
    }
}
