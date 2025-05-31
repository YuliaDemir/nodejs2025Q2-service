import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateAlbumDto {
    @IsString()
    name: string;

    @IsInt()
    @Type(() => Number)
    year: number;

    @IsUUID('4')
    @IsOptional()
    artistId: string | null; // refers to Artist
}