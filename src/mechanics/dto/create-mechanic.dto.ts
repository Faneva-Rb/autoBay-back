import { IsBoolean, IsDate, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Role } from "src/generated/prisma/enums";

export class CreateMechanicDto{
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
    speciality: string

    @IsString()
    salary: string

    @IsBoolean()
    is_available: boolean = true

    @IsString()
    phoneNumber: string

    @IsDateString()
    hire_date: string

}