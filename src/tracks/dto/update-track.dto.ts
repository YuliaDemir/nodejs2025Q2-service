import { IsInt, IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class UpdateTrackDto {
    @IsUUID('4')
    id: string; // uuid v4

    @IsOptional()
    @IsString()
    name: string;

    @IsUUID('4')
    @IsOptional()
    artistId: string | null; // refers to Artist

    @IsUUID('4')
    @IsOptional()
    albumId: string | null; // refers to Album

    @IsOptional()
    @IsInt()
    duration: number; // integer number
}