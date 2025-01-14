import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ProgressLog {
  @Prop({ required: true, ref: 'UserProfile' }) // Reference to the user who logged the progress
  user_id: string;

  @Prop({ required: true }) // Date of the progress log
  date: Date;

  @Prop({ required: true }) // User's weight in kg or lbs
  weight: number;

  @Prop({ required: false }) // Optional body fat percentage
  body_fat_percentage?: number;

  @Prop({ required: false }) // Optional muscle mass in kg or lbs
  muscle_mass?: number;

  @Prop({ required: false }) // Optional notes about the progress
  notes?: string;
}

export const ProgressLogSchema = SchemaFactory.createForClass(ProgressLog);
