import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import mongoose from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class RefreshToken {
  @Prop({ required: true })
  token: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  userId: string;

  @Prop({ required: true })
  sessionId: string;

  @Prop({ required: true })
  expiryDate: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
