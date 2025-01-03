
import { IsEmail, IsNotEmpty, IsString, IsNumber, Min } from "class-validator";
import { Type } from 'class-transformer';

export class UpdateMoneyPointsDto{
    @IsEmail()
    @IsNotEmpty()
    email: string;

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

 

}
