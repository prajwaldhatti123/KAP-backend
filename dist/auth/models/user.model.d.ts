import { Document } from 'mongoose';
export declare class UserProfile {
    email: string;
    password: string;
    phone_number?: string;
    name: string;
    bio?: string;
    gender?: string;
    birthday?: string;
    profile_pic?: string;
    last_login?: Date;
    preferences?: {
        workout_goal?: string;
        notification?: boolean;
    };
    login_history?: {
        timestamp: Date;
        ip: string;
    }[];
    status: string;
}
export declare const UserProfileSchema: import("mongoose").Schema<UserProfile, import("mongoose").Model<UserProfile, any, any, any, Document<unknown, any, UserProfile> & UserProfile & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UserProfile, Document<unknown, {}, import("mongoose").FlatRecord<UserProfile>> & import("mongoose").FlatRecord<UserProfile> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
