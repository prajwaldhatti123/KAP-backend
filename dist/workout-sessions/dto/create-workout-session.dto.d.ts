declare class ExerciseSetDto {
    set: number;
    weight_metric: string;
    inst_type?: string;
    weight_value: number;
    reps: number;
    notes?: string;
}
declare class WorkoutSessionExerciseDto {
    exercise_id: string;
    exercise_name: string;
    exercise_category: string;
    body_part: string;
    main_sets: ExerciseSetDto[];
    warmup_sets?: ExerciseSetDto[];
}
export declare class CreateWorkoutSessionDto {
    routine_id: string;
    date: Date;
    exercises: WorkoutSessionExerciseDto[];
    duration?: number;
    notes?: string;
}
export {};
