import { IsBoolean, IsString, IsUUID, MinLength } from "class-validator";

export class CreateArtistDto {
    @IsUUID('4')
    id: string; // uuid v4

    @IsString()
    name: string;

    @IsBoolean()
    grammy: boolean;
}