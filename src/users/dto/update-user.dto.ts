import { IsInt, IsOptional, IsString, IsUUID, Min, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsString()
    oldPassword: string;

    @IsString()
    newPassword: string;
}