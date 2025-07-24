import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class RefreshToken {
  @ApiProperty({ description: 'The refresh token' })
  @Prop({ required: true })
  token: string;

  @ApiProperty({ description: "The user's ID" })
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  userId: string;

  @ApiProperty({ description: 'The session ID' })
  @Prop({ required: true })
  sessionId: string;

  @ApiProperty({ description: 'The expiry date of the token' })
  @Prop({ required: true })
  expiryDate: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
