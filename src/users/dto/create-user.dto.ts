import { IsInt, IsString, IsUUID, Min, MinLength } from "class-validator";

export class CreateUserDto {
    @IsUUID('4')
    id: string; // uuid v4

    @IsString()
    login: string;

    @IsString()
    password: string;

    @IsInt()
    @Min(1)
    version: number; // integer number, increments on update
    
    @IsInt()
    createdAt: number; // timestamp of creation
    
    @IsInt()
    updatedAt: number; // timestamp of last update
}