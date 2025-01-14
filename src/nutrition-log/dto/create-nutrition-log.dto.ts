import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateNutritionLogDto {
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  calories: number;

  @IsNumber()
  @IsNotEmpty()
  protein: number;

  @IsNumber()
  @IsNotEmpty()
  carbs: number;

  @IsNumber()
  @IsNotEmpty()
  fats: number;

  @IsString()
  @IsOptional()
  meal_description?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
