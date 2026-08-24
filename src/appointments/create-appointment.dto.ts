import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { AppointmentStatus, AppointmentType } from "src/generated/prisma/enums";

export class CreateAppointmentDto{
    @IsDateString()
    date: string

    @IsString()
    @IsNotEmpty()
    time: string

    @IsString()
    @IsOptional()
    description?: string

    @IsInt()
    idCustomer: number

    @IsInt()
    idVehicle: number

    @IsInt()
    @IsOptional()
    idMechanic?: number

    @IsEnum(AppointmentType)
    type: AppointmentType

    @IsEnum(AppointmentStatus)
    @IsOptional()
    status?: AppointmentStatus

    @IsDateString()
    @IsOptional()
    reminderSentAt?: string

}