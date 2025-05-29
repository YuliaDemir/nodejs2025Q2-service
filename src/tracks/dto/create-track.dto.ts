import { IsInt, IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class CreateTrackDto {
    @IsUUID('4')
    id: string; // uuid v4

    @IsString()
    name: string;

    @IsUUID('4')
    @IsOptional()
    artistId: string | null; // refers to Artist

    @IsUUID('4')
    @IsOptional()
    albumId: string | null; // refers to Album

    @IsInt()
    duration: number; // integer number
}