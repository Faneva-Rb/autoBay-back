import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt"
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ){}

    async login(loginDto: LoginDto){
        const { email, password } = loginDto

        const user = await this.usersService.findEmail(email)
        if(!user) {
            throw new UnauthorizedException('Utilisateur introuvable')
        }

        const passwordValid = await bcrypt.compare(password, user.password)

        if(!passwordValid) throw new UnauthorizedException('Mot de passe incorrecte')

        const payload = { sub: user.id, email: user.email, role: user.role }

        const token = await this.jwtService.signAsync(payload)

        return {
            token,
            user
        }
    }
}
