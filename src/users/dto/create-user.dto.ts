import { IsInt, IsString, IsUUID, Min, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    login: string;

    @IsString()
    @MinLength(5)
    password: string;
}