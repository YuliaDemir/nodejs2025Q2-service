import { IsArray, IsString, IsUUID, MinLength } from "class-validator";

export class CreateFavoritesDto {
    @IsArray()
    @IsUUID('4', {each: true})
    artists: string[]; // favorite artists ids

    @IsArray()
    @IsUUID('4', {each: true})
    albums: string[]; // favorite albums ids
  
    @IsArray()
    @IsUUID('4', {each: true})
    tracks: string[];
}