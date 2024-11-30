import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  validateEmail,
  validatePhoneNumber,
  validateBirthday,
  validateIpAddress,
} from './auth.validator.functions';

export type UserProfileDocument = UserProfile & Document;

@Schema({ timestamps: true })
export class UserProfile {
  @Prop({
    required: true,
    unique: true,
    validate: {
      validator: validateEmail,
      message: 'Invalid email address format',
    },
  })
  email_id: string;

  @Prop({
    required: false,
    validate: {
      validator: validatePhoneNumber,
      message: 'Phone number must be 10-15 digits',
    },
  })
  phone_number?: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  bio?: string;

  @Prop({
    enum: ['male', 'female', 'other'],
    required: false,
    default: null,
  })
  gender?: string;

  @Prop({
    validate: {
      validator: validateBirthday,
      message: 'Birthday must be in YYYY-MM-DD format',
    },
  })
  birthday?: string;

  @Prop()
  profile_pic?: string;

  @Prop({ default: null })
  last_login?: Date;

  @Prop({
    type: Object,
    default: {},
  })
  preferences?: {
    workout_goal?: string;
    notification?: boolean;
  };

  @Prop([
    {
      timestamp: { type: Date },
      ip: {
        type: String,
        validate: {
          validator: validateIpAddress,
          message: 'Invalid IP address format',
        },
      },
    },
  ])
  login_history?: {
    timestamp: Date;
    ip: string;
  }[];

  @Prop({
    enum: ['active', 'suspended', 'deleted'],
    default: 'active',
  })
  status: string;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
