import { Document } from 'mongoose';
export declare class ProgressLog {
    user_id: string;
    date: Date;
    weight: number;
    body_fat_percentage?: number;
    muscle_mass?: number;
    notes?: string;
}
export declare const ProgressLogSchema: import("mongoose").Schema<ProgressLog, import("mongoose").Model<ProgressLog, any, any, any, Document<unknown, any, ProgressLog> & ProgressLog & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ProgressLog, Document<unknown, {}, import("mongoose").FlatRecord<ProgressLog>> & import("mongoose").FlatRecord<ProgressLog> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
