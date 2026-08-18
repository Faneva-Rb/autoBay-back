import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ReceptionistsService } from './receptionists.service';
import { CreateReceptionistDto } from './dto/create-receptionist.dto';
import { JwtAuthGuad } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/generated/prisma/enums';
import { UpdateReceptionistDto } from './dto/update-receptionist.dto';

@Controller('receptionists')
@UseGuards(JwtAuthGuad, RolesGuard)
@Roles(Role.ADMIN)
export class ReceptionistsController {
    constructor(private readonly receptionistService: ReceptionistsService){}

    @Get()
    findAll(){
        return this.receptionistService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.receptionistService.findOne(+id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateReceptionistDto: UpdateReceptionistDto){
        return this.receptionistService.updateReceptionist(+id, updateReceptionistDto)
    }

    @Post()
    create(@Body() createReceptionistDto: CreateReceptionistDto){
        return this.receptionistService.createReceptionist(createReceptionistDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string){
        return this.receptionistService.removeReceptionist(+id)
    }
}
