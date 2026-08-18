import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReceptionistDto } from './dto/create-receptionist.dto';
import * as bcrypt from "bcrypt"
import { Role } from 'src/generated/prisma/enums';
import { UsersService } from 'src/users/users.service';
import { UpdateReceptionistDto } from './dto/update-receptionist.dto';

@Injectable()
export class ReceptionistsService {

    constructor(private readonly prisma: PrismaService, private readonly usersService: UsersService) { }


    async findAll(){
        const receptionists = await this.prisma.receptionist.findMany()

        if(receptionists.length == 0) throw new NotFoundException("Aucun résulat trouvé")

        return receptionists
    }

    async findOne(id: number){
        return this.prisma.receptionist.findUnique({
            where: {
                id: id
            }
        })
    }


    async createReceptionist(createReceptionistDto: CreateReceptionistDto) {
        const { name, firstName, email, password, salary, hire_date, is_active, phoneNumber } = createReceptionistDto

        const hashedPassword = await bcrypt.hash(password, 10)

        const existingUser = await this.usersService.findEmail(email)

        if(existingUser){
            throw new ConflictException("Cet email est déja utilisé")
        }

        return this.prisma.receptionist.create({
            data: {
                salary,
                hire_date,
                phoneNumber,
                is_active,
                
                user: {
                    create: {
                        email,
                        name,
                        firstName,
                        password: hashedPassword,
                        role: Role.RECEPTIONIST
                    }
                }
            }, 
            include: {
                user: true
            }
        })

    }

    async updateReceptionist(id: number, updateReceptionistDto: UpdateReceptionistDto){
        const receptionistId = await this.findOne(id)
        if(!receptionistId) throw new NotFoundException("Receptionniste introuvable")
        return this.prisma.receptionist.update({
            where: { id },
            data: {
                salary: updateReceptionistDto.salary,
                hire_date: updateReceptionistDto.hire_date,
                is_active: updateReceptionistDto.is_active,
                user: {
                    update: {
                        firstName: updateReceptionistDto.firstName,
                        name: updateReceptionistDto.name,
                    }
                }
            }
        })
    }

    async removeReceptionist(id: number){
        await this.prisma.$transaction(async (tx) => {
            const receptionist = await tx.receptionist.findUnique({
                where: {
                    id: id
                }
            })

            if(!receptionist) throw new Error("Receptionist introuvable")

            await tx.receptionist.delete({
                where: {
                    id: id
                }
            })   

            await tx.user.delete({
                where: {
                    id: receptionist.idUser
                }
            })
        })
    }
}
