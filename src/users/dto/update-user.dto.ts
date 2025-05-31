import { IsInt, IsOptional, IsString, IsUUID, Min, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsUUID('4')
    id: string; // uuid v4

    @IsString()
    oldPassword: string;

    @IsString()
    newPassword: string;
}