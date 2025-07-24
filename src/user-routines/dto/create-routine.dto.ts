import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ExerciseSetDto {
  @ApiProperty({ description: 'Set number', example: 1 })
  @IsNotEmpty()
  set: number;

  @ApiProperty({ description: 'Weight metric (kg or lbs)', example: 'kg' })
  @IsNotEmpty()
  weight_metric: string;

  @ApiProperty({
    description: 'Instrument type (e.g., "bar", "color")',
    example: 'bar',
    required: false,
  })
  @IsOptional()
  inst_type?: string;

  @ApiProperty({ description: 'Weight value', example: 100 })
  @IsNotEmpty()
  weight_value: number;

  @ApiProperty({ description: 'Number of reps', example: 12 })
  @IsNotEmpty()
  reps: number;

  @ApiProperty({
    description: 'Optional timer for the set',
    example: 60,
    required: false,
  })
  @IsOptional()
  timer?: number;
}

class RoutineExerciseDto {
  @ApiProperty({ description: 'ID of the exercise', example: 'exercise123' })
  @IsNotEmpty()
  exercise_id: string;

  @ApiProperty({ description: 'Name of the exercise', example: 'Bench Press' })
  @IsNotEmpty()
  exercise_name: string;

  @ApiProperty({
    description: 'Category of the exercise',
    example: 'Machine',
  })
  @IsNotEmpty()
  exercise_category: string;

  @ApiProperty({ description: 'Targeted body part', example: 'Chest' })
  @IsNotEmpty()
  body_part: string;

  @ApiProperty({ type: () => [ExerciseSetDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseSetDto)
  exercise_main_details: ExerciseSetDto[];

  @ApiProperty({ type: () => [ExerciseSetDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  exercise_warmup_details?: ExerciseSetDto[];
}

export class CreateRoutineDto {
  @ApiProperty({
    description: 'Name of the routine (e.g., "Chest Day")',
    example: 'Chest Day',
  })
  @IsNotEmpty()
  routine_name: string;

  @ApiProperty({
    description: 'Optional description of the routine',
    example: 'A routine focused on chest exercises',
    required: false,
  })
  @IsOptional()
  routine_desc?: string;

  @ApiProperty({
    description: 'Optional timer for the entire routine in seconds',
    example: 3600,
    required: false,
  })
  @IsOptional()
  routine_timer?: number;

  @ApiProperty({ type: () => [RoutineExerciseDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoutineExerciseDto)
  routine_exercises: RoutineExerciseDto[];

  @ApiProperty({
    description: 'Difficulty of the routine',
    example: 'Intermediate',
    required: false,
  })
  @IsOptional()
  difficulty?: string;

  @ApiProperty({
    description: 'Tags for the routine',
    example: ['chest', 'strength'],
    required: false,
  })
  @IsOptional()
  tags?: string[];
}
