import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { JwtAuthGuad } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/generated/prisma/enums';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
@UseGuards(JwtAuthGuad, RolesGuard)
@Roles(Role.RECEPTIONIST)
export class CustomersController {
    constructor(private readonly customerService: CustomersService){}

    @Get()
    findAll(){
        return this.customerService.findAll()
    }

    @Post()
    create(@Body() createCustomerDto: CreateCustomerDto){
        return this.customerService.createCustomer(createCustomerDto)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() udpateCustomerDto: UpdateCustomerDto){
        return this.customerService.udpateCustomer(+id, udpateCustomerDto)
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.customerService.findOne(+id)
    }
}
