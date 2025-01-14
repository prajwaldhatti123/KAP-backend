declare class ExerciseSetDto {
    set: number;
    weight_metric: string;
    inst_type?: string;
    weight_value: number;
    reps: number;
    timer?: number;
}
declare class RoutineExerciseDto {
    exercise_id: string;
    exercise_name: string;
    exercise_category: string;
    body_part: string;
    exercise_main_details: ExerciseSetDto[];
    exercise_warmup_details?: ExerciseSetDto[];
}
export declare class CreateRoutineDto {
    routine_name: string;
    routine_desc?: string;
    routine_timer?: number;
    routine_exercises: RoutineExerciseDto[];
    difficulty?: string;
    tags?: string[];
}
export {};
