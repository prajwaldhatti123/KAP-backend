import { Document } from 'mongoose';
export declare class NutritionLog {
    user_id: string;
    date: Date;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    meal_description?: string;
    notes?: string;
}
export declare const NutritionLogSchema: import("mongoose").Schema<NutritionLog, import("mongoose").Model<NutritionLog, any, any, any, Document<unknown, any, NutritionLog> & NutritionLog & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NutritionLog, Document<unknown, {}, import("mongoose").FlatRecord<NutritionLog>> & import("mongoose").FlatRecord<NutritionLog> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
