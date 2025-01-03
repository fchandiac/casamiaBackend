
import { IsString, IsNotEmpty, MaxLength, IsNumber, Min, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class ValidateMissionDto {
    @IsString()
    @IsNotEmpty()
    id: string;
   
    
    
    @IsNotEmpty()
    @Type(() => Number) // Transforma el valor a número
    @IsNumber() // Valida que sea un número
    @Min(0) // Valida que el precio sea mínimo 0
    points: number;
    
    @IsNotEmpty()
    @Type(() => Number) // Transforma el valor a número
    @IsNumber() // Valida que sea un número
    @Min(0) // Valida que el precio sea mínimo 0
    money: number;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;


}