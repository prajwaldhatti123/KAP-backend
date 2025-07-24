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
    description: 'Optional notes for the set',
    example: 'Felt strong today',
    required: false,
  })
  @IsOptional()
  notes?: string;
}

class WorkoutSessionExerciseDto {
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
  main_sets: ExerciseSetDto[];

  @ApiProperty({ type: () => [ExerciseSetDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseSetDto)
  @IsOptional()
  warmup_sets?: ExerciseSetDto[];
}

export class CreateWorkoutSessionDto {
  @ApiProperty({
    description: 'ID of the routine used for the session',
    example: 'routine123',
  })
  @IsNotEmpty()
  routine_id: string;

  @ApiProperty({
    description: 'Date of the workout session',
    example: '2024-01-01T10:00:00.000Z',
  })
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ type: () => [WorkoutSessionExerciseDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkoutSessionExerciseDto)
  exercises: WorkoutSessionExerciseDto[];

  @ApiProperty({
    description: 'Duration of the workout in minutes',
    example: 60,
    required: false,
  })
  @IsOptional()
  duration?: number;

  @ApiProperty({
    description: 'Optional notes for the session',
    example: 'Great session today',
    required: false,
  })
  @IsOptional()
  notes?: string;
}
