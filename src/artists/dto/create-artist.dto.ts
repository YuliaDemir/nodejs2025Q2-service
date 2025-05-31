import { IsBoolean, IsString, IsUUID, MinLength } from "class-validator";

export class CreateArtistDto {
    @IsString()
    name: string;

    @IsBoolean()
    grammy: boolean;
}