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
  timer?: number;
}

class RoutineExerciseDto {
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
  exercise_main_details: ExerciseSetDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseSetDto)
  @IsOptional()
  exercise_warmup_details?: ExerciseSetDto[];
}

export class CreateRoutineDto {
  @IsNotEmpty()
  routine_name: string;

  @IsOptional()
  routine_desc?: string;

  @IsOptional()
  routine_timer?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoutineExerciseDto)
  routine_exercises: RoutineExerciseDto[];

  @IsOptional()
  difficulty?: string;

  @IsOptional()
  tags?: string[];
}
