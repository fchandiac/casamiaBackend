
import { IsString, IsNotEmpty, MaxLength, IsNumber, Min, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class ValidateMissionDto {
    @IsString()
    @IsNotEmpty()
    id: string;
   



}