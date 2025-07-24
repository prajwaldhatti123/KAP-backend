import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProgressLogDto {
  @ApiProperty({
    description: 'Date of the progress log',
    example: '2024-01-01T10:00:00.000Z',
  })
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ description: 'Body weight in kg', example: 80.5 })
  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @ApiProperty({
    description: 'Body fat percentage',
    example: 15.2,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  body_fat_percentage?: number;

  @ApiProperty({
    description: 'Muscle mass in kg',
    example: 60.1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  muscle_mass?: number;

  @ApiProperty({
    description: 'Optional notes for the progress log',
    example: 'Feeling good, making progress',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;
}
