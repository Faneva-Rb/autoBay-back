import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMechanicDto } from './dto/create-mechanic.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt"
import { Role } from 'src/generated/prisma/enums';
import { UpdateMechanicDto } from './dto/update-mechanic.dto';

@Injectable()
export class MechanicsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly usersService: UsersService
    ) { }

    async findAll(){
        const mechanics = await this.prisma.mechanicView.findMany()

        if(mechanics.length == 0) throw new NotFoundException("Aucun résultat trouvé")

        return mechanics
    }

    async findOne(id: number){
        return this.prisma.mechanicView.findFirst({
            where: {
                mechanic_id: id
            }
        })
    }

    async createMechanic(createMechanicDto: CreateMechanicDto) {
        const { name, firstName, email, password, salary, speciality, is_available, hire_date, phoneNumber } = createMechanicDto


        const existingUser = await this.usersService.findEmail(email)

        if(existingUser){
            throw new ConflictException("Cet email est déja utilisé")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        return this.prisma.mechanic.create({
            data: {
                salary,
                speciality,
                phoneNumber,
                hire_date: new Date(createMechanicDto.hire_date),
                is_available,

                user: {
                    create: {
                        name,
                        firstName,
                        email,
                        password: hashedPassword,
                        role: Role.MECHANIC
                    }
                }
            },
            include: {
                user: true
            }
        })
    }

    async updateMechanic(id: number, updateMechanicDto: UpdateMechanicDto){
        const mechanicId = await this.findOne(id)
        if(!mechanicId) throw new NotFoundException("Receptionniste introuvable")
        return this.prisma.mechanic.update({
            where: { id },
            data: {
                salary: updateMechanicDto.salary,
                hire_date: updateMechanicDto.hire_date,
                is_available: updateMechanicDto.is_available,
                user: {
                    update: {
                        firstName: updateMechanicDto.firstName,
                        name: updateMechanicDto.name,
                    }
                }
            }
        })
    }

    async removeMechanic(id: number){
        await this.prisma.$transaction(async (tx) => {
            const mechanic = await tx.mechanic.findUnique({
                where: {
                    id: id
                }
            })

            if(!mechanic) throw new Error("Mécanicien introuvable")

            await tx.mechanic.delete({
                where: {
                    id: id
                }
            })   

            await tx.user.delete({
                where: {
                    id: mechanic.idUser
                }
            })
        })
    }
}
