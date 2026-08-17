import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuad } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/generated/prisma/enums';

@Controller('users')
@UseGuards(JwtAuthGuad, RolesGuard)
@Roles(Role.ADMIN)
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ){}

    @Post()
    create(@Body() createUserDto: CreateUserDto){
        return this.usersService.create(createUserDto)
    }

    @Get()
    findAll(){
        return this.usersService.findAll()
    }
}
