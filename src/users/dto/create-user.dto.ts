import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { Role } from "src/generated/prisma/enums";

export class CreateUserDto{
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsOptional()
    firstName: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(8)
    password: string

    @IsOptional()
    @IsEnum(Role)
    role?: Role

}