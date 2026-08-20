import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto{
    @IsNotEmpty()
    name: string

    @IsOptional()
    firstName: string

    @IsOptional()
    address: string

    @IsEmail()
    email: string

    @IsString()
    phoneNumber: string

}