import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProgressLogDto {
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsNumber()
  @IsOptional()
  body_fat_percentage?: number;

  @IsNumber()
  @IsOptional()
  muscle_mass?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
