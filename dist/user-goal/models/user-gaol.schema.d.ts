import { Document } from 'mongoose';
export type UserGoalDocument = UserGoal & Document;
export declare class UserGoal {
    user_id: string;
    goal_type: string;
    start_date: Date;
    end_date: Date;
    notes?: string;
}
export declare const UserGoalSchema: import("mongoose").Schema<UserGoal, import("mongoose").Model<UserGoal, any, any, any, Document<unknown, any, UserGoal> & UserGoal & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserGoal, Document<unknown, {}, import("mongoose").FlatRecord<UserGoal>> & import("mongoose").FlatRecord<UserGoal> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
