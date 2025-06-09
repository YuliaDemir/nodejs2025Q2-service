import { IsInt, IsString, IsUUID, Min } from 'class-validator';

export class ReturnUserDto {
  @IsUUID('4')
  id: string; // uuid v4

  @IsString()
  login: string;

  @IsInt()
  @Min(1)
  version: number; 

  @IsInt()
  createdAt: number; 

  @IsInt()
  updatedAt: number; 
}
