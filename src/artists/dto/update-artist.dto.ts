import { IsBoolean, IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class UpdateArtistDto {
    @IsUUID('4')
    id: string; // uuid v4

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsBoolean()
    grammy: boolean;
}