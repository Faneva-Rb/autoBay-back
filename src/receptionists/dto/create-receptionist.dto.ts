import { IsBoolean, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { Role } from "src/generated/prisma/enums"

export class CreateReceptionistDto{

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

    @IsEnum(Role)
    @IsOptional()
    role?: Role


    @IsString()
    salary: string

    @IsBoolean()
    is_active: boolean = true

    @IsString()
    phoneNumber: string

    @IsDateString()
    hire_date: string

}