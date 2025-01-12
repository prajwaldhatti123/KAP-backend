import mongoose from 'mongoose';
export declare class RefreshToken {
    token: string;
    userId: string;
    sessionId: string;
    expiryDate: Date;
}
export declare const RefreshTokenSchema: mongoose.Schema<RefreshToken, mongoose.Model<RefreshToken, any, any, any, mongoose.Document<unknown, any, RefreshToken> & RefreshToken & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, RefreshToken, mongoose.Document<unknown, {}, mongoose.FlatRecord<RefreshToken>> & mongoose.FlatRecord<RefreshToken> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
