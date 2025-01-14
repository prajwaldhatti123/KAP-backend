import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ExerciseSetDto {
  @IsNotEmpty()
  set: number;

  @IsNotEmpty()
  weight_metric: string;

  @IsOptional()
  inst_type?: string;

  @IsNotEmpty()
  weight_value: number;

  @IsNotEmpty()
  reps: number;

  @IsOptional()
  notes?: string;
}

class WorkoutSessionExerciseDto {
  @IsNotEmpty()
  exercise_id: string;

  @IsNotEmpty()
  exercise_name: string;

  @IsNotEmpty()
  exercise_category: string;

  @IsNotEmpty()
  body_part: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseSetDto)
  main_sets: ExerciseSetDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseSetDto)
  @IsOptional()
  warmup_sets?: ExerciseSetDto[];
}

export class CreateWorkoutSessionDto {
  @IsNotEmpty()
  routine_id: string;

  @IsNotEmpty()
  date: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkoutSessionExerciseDto)
  exercises: WorkoutSessionExerciseDto[];

  @IsOptional()
  duration?: number;

  @IsOptional()
  notes?: string;
}
