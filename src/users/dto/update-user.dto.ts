import { IsInt, IsOptional, IsString, IsUUID, Min, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsUUID('4')
    id: string; // uuid v4

    @IsOptional()
    @IsString()
    login: string;

    @IsOptional()
    @IsString()
    password: string;
}