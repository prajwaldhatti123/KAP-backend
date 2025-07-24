import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateNutritionLogDto {
  @ApiProperty({
    description: 'Date of the nutrition log',
    example: '2024-01-01T10:00:00.000Z',
  })
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ description: 'Total calories consumed', example: 2500 })
  @IsNumber()
  @IsNotEmpty()
  calories: number;

  @ApiProperty({
    description: 'Total protein consumed (in grams)',
    example: 180,
  })
  @IsNumber()
  @IsNotEmpty()
  protein: number;

  @ApiProperty({
    description: 'Total carbohydrates consumed (in grams)',
    example: 300,
  })
  @IsNumber()
  @IsNotEmpty()
  carbs: number;

  @ApiProperty({
    description: 'Total fats consumed (in grams)',
    example: 80,
  })
  @IsNumber()
  @IsNotEmpty()
  fats: number;

  @ApiProperty({
    description: 'Optional meal description',
    example: 'Lunch',
    required: false,
  })
  @IsString()
  @IsOptional()
  meal_description?: string;

  @ApiProperty({
    description: 'Optional notes about the nutrition log',
    example: 'High protein meal',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;
}
