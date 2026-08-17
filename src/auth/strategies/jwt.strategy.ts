import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService
    ){
        const jwtSecret = configService.get<string>('JWT_SECRET')
        if(!jwtSecret){
            throw new Error('JWT_SERCRET introuvable')
        }

        super({
            jwtFromRequest: 
            ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret
        });
    }


    async validate(payload: any) {
        const user = await this.prisma.user.findUnique({ where: { id: payload.sub }, omit: { password: true} })

        if(!user){
            throw new UnauthorizedException("Utilisateur introuvable")
        }
        return user
    }
}