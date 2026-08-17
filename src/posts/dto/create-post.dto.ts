import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    title: string

    @IsBoolean()
    @IsOptional()
    published?: boolean = false

}
