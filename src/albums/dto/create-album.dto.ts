import { IsInt, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateAlbumDto {
    @IsUUID('4')
    id: string; // uuid v4

    @IsString()
    name: string;

    @IsInt()
    year: number;

    @IsUUID('4')
    @IsOptional()
    artistId: string | null; // refers to Artist
}