import * as bcrypt from "bcrypt"
import { Role } from "src/generated/prisma/enums";
import { PrismaService } from "src/prisma/prisma.service";


class SeedService{
    constructor(private readonly prismaService: PrismaService){}

    async createAdmin(){
        const existingAdmin = await this.prismaService.user.findUnique({
            where: {
                email: "admin@garage.com"
            }
        })
        if(existingAdmin){
            console.log('existe');
            return;
        }

        const password = await bcrypt.hash('Admin@123456', 10)
        const admin = await this.prismaService.user.create({
            data: {
                name: 'Garage',
                firstName: 'Admnistrator',
                email: 'admin@garage.com',
                password,
                role: Role.ADMIN
            }
        })

        console.log(`Admin créé ${admin.email}`);
    }

    async run(){
        await this.createAdmin()
    }
}

async function main(){
    const prismaService = new PrismaService()

    const seedService = new SeedService(prismaService)

    try {
        await prismaService.$connect()
        await seedService.run()
    } catch (error) {
        console.log(error);
        
    } finally{
        await prismaService.$disconnect()
    }
}

main();