import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserGoalDocument = UserGoal & Document;

@Schema({ timestamps: true })
export class UserGoal {
  @ApiProperty({ description: "The user's ID" })
  @Prop({ required: true, ref: 'UserProfile' })
  user_id: string;

  @ApiProperty({
    description: 'The type of goal',
    example: 'bulking',
    enum: ['bulking', 'cutting', 'maintenance'],
  })
  @Prop({ required: true, enum: ['bulking', 'cutting', 'maintenance'] })
  goal_type: string;

  @ApiProperty({ description: 'The start date of the goal' })
  @Prop({ required: true, default: Date.now })
  start_date: Date;

  @ApiProperty({ description: 'The end date of the goal' })
  @Prop({ required: true })
  end_date: Date;

  @ApiProperty({
    description: 'Optional notes for the goal',
    example: 'Focus on compound lifts',
    required: false,
  })
  @Prop({ required: false })
  notes?: string;
}

export const UserGoalSchema = SchemaFactory.createForClass(UserGoal);
