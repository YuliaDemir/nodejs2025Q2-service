import { IsInt, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateAlbumDto {
    @IsUUID('4')
    id: string; // uuid v4

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsInt()
    year: number;

    @IsUUID('4')
    @IsOptional()
    artistId: string | null; // refers to Artist
}