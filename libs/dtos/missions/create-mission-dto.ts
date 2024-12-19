import { IsString, IsNotEmpty, MaxLength, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateMissionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @MaxLength(200)
  description: string;

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
  imageUrl: string;
}