import { Document } from 'mongoose';
export declare class WorkoutSession {
    user_id: string;
    routine_id: string;
    date: Date;
    exercises: {
        exercise_id: string;
        exercise_name: string;
        exercise_category: string;
        body_part: string;
        main_sets: {
            set: number;
            weight_metric: string;
            inst_type?: string;
            weight_value: number;
            reps: number;
            notes?: string;
        }[];
        warmup_sets: {
            set: number;
            weight_metric: string;
            inst_type?: string;
            weight_value: number;
            reps: number;
            notes?: string;
        }[];
    }[];
    duration?: number;
    notes?: string;
}
export declare const WorkoutSessionSchema: import("mongoose").Schema<WorkoutSession, import("mongoose").Model<WorkoutSession, any, any, any, Document<unknown, any, WorkoutSession> & WorkoutSession & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, WorkoutSession, Document<unknown, {}, import("mongoose").FlatRecord<WorkoutSession>> & import("mongoose").FlatRecord<WorkoutSession> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
