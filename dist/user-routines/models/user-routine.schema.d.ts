export declare class Routine {
    user_id: string;
    routine_name: string;
    routine_desc?: string;
    routine_timer?: number;
    routine_exercises: {
        exercise_id: string;
        exercise_name: string;
        exercise_category: string;
        body_part: string;
        exercise_main_details: {
            set: number;
            weight_metric: string;
            inst_type?: string;
            weight_value: number;
            reps: number;
            timer?: number;
        }[];
        exercise_warmup_details?: {
            set: number;
            weight_metric: string;
            inst_type?: string;
            weight_value: number;
            reps: number;
            timer?: number;
        }[];
    }[];
    difficulty?: string;
    tags?: string[];
}
export declare const RoutineSchema: import("mongoose").Schema<Routine, import("mongoose").Model<Routine, any, any, any, import("mongoose").Document<unknown, any, Routine> & Routine & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Routine, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Routine>> & import("mongoose").FlatRecord<Routine> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
