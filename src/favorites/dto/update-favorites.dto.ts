import { IsArray, IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class UpdateFavoritesDto {
    @IsOptional()
    @IsArray()
    @IsUUID('4', {each: true})
    artists?: string[]; // favorite artists ids

    @IsOptional()
    @IsArray()
    @IsUUID('4', {each: true})
    albums?: string[]; // favorite albums ids
  
    @IsOptional()
    @IsArray()
    @IsUUID('4', {each: true})
    tracks?: string[];
}