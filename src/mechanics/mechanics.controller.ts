import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuad } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/generated/prisma/enums';
import { MechanicsService } from './mechanics.service';
import { CreateMechanicDto } from './dto/create-mechanic.dto';
import { UpdateMechanicDto } from './dto/update-mechanic.dto';

@Controller('mechanics')
@UseGuards(JwtAuthGuad, RolesGuard)
@Roles(Role.ADMIN)
export class MechanicsController {
    constructor(private readonly mechanicsService: MechanicsService){}

    @Get()
    findAll(){
        return this.mechanicsService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.mechanicsService.findOne(+id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMechanicDto: UpdateMechanicDto){
        return this.mechanicsService.updateMechanic(+id, updateMechanicDto)
    }

    @Post()
    create(@Body() createMechanicDto: CreateMechanicDto){
        return this.mechanicsService.createMechanic(createMechanicDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.mechanicsService.removeMechanic(+id)
    }
}
