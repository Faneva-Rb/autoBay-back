import { IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";
import { Fuel, Transmission } from "src/generated/prisma/enums";


export class CreateVehicleDto {

    @IsNotEmpty()
    immatriculation: string

    @IsString()
    model: string

    @IsString()
    year: string

    @IsString()
    brand: string

    @IsEnum(Fuel)
    fuel_type: Fuel

    @IsEnum(Transmission)
    transmission: Transmission

    @IsInt()
    idCustomer: number
}