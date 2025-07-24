import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  validateEmail,
  validatePhoneNumber,
  validateBirthday,
  validateIpAddress,
} from '../validators/auth.validator.functions';

class Preferences {
  @ApiProperty({
    description: "User's workout goal",
    example: 'Build muscle',
    required: false,
  })
  workout_goal?: string;

  @ApiProperty({
    description: 'User notification preference',
    example: true,
    required: false,
  })
  notification?: boolean;
}

class LoginHistory {
  @ApiProperty({ description: 'Timestamp of the login' })
  timestamp: Date;

  @ApiProperty({ description: 'IP address of the login' })
  ip: string;
}
// export type UserProfileDocument = UserProfile & Document;

@Schema({ timestamps: true })
export class UserProfile {
  @ApiProperty({
    description: "User's email address",
    example: 'test@example.com',
  })
  @Prop({
    required: true,
    unique: true,
    validate: {
      validator: validateEmail,
      message: 'Invalid email address format',
    },
  })
  email: string;

  @Prop({
    required: true,
    unique: true,
  })
  password: string;

  @ApiProperty({
    description: "User's phone number",
    example: '1234567890',
    required: false,
  })
  @Prop({
    required: false,
    validate: {
      validator: validatePhoneNumber,
      message: 'Phone number must be 10-15 digits',
    },
  })
  phone_number?: string;

  @ApiProperty({
    description: "User's name",
    example: 'John Doe',
    required: false,
  })
  @Prop({ required: false })
  name: string;

  @ApiProperty({
    description: "User's bio",
    example: 'Fitness enthusiast',
    required: false,
  })
  @Prop()
  bio?: string;

  @ApiProperty({
    description: "User's gender",
    example: 'male',
    enum: ['male', 'female', 'other'],
    required: false,
  })
  @Prop({
    enum: ['male', 'female', 'other'],
    required: false,
    default: null,
  })
  gender?: string;

  @ApiProperty({
    description: "User's birthday",
    example: '1990-01-01',
    required: false,
  })
  @Prop({
    validate: {
      validator: validateBirthday,
      message: 'Birthday must be in YYYY-MM-DD format',
    },
  })
  birthday?: string;

  @ApiProperty({
    description: "User's profile picture URL",
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @Prop()
  profile_pic?: string;

  @ApiProperty({ description: 'Last login date', required: false })
  @Prop({ default: null })
  last_login?: Date;

  @ApiProperty({ type: () => Preferences, required: false })
  @Prop({
    type: Object,
    default: {},
  })
  preferences?: Preferences;

  @ApiProperty({ type: () => [LoginHistory], required: false })
  @Prop([
    {
      timestamp: { type: Date, default: Date.now },
      ip: {
        type: String,
        validate: {
          validator: validateIpAddress,
          message: 'Invalid IP address format',
        },
      },
    },
  ])
  login_history?: LoginHistory[];

  @ApiProperty({
    description: 'User status',
    example: 'active',
    enum: ['active', 'suspended', 'deleted'],
  })
  @Prop({
    enum: ['active', 'suspended', 'deleted'],
    default: 'active',
  })
  status: string;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
