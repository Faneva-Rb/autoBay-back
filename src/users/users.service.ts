import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async findEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } })
    }

    async findAll(){
        return this.prisma.user.findMany()
    }

    async create(createUserDto: CreateUserDto) {
        const { name, firstName, email, password, role } = createUserDto

        const existingUser = await this.findEmail(email)

        if(existingUser) {
            throw new ConflictException("Cet email est déja utilisé")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await this.prisma.user.create({
            data: {
                name,
                firstName,
                email,
                password: hashedPassword,
                role
            },

            omit: {
                password: true
            }
        })

        return user;
    }

}
