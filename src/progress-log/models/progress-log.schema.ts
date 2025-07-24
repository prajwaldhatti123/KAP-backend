import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class ProgressLog {
  @ApiProperty({ description: "The user's ID" })
  @Prop({ required: true, ref: 'UserProfile' }) // Reference to the user who logged the progress
  user_id: string;

  @ApiProperty({ description: 'Date of the progress log' })
  @Prop({ required: true }) // Date of the progress log
  date: Date;

  @ApiProperty({ description: "User's weight in kg or lbs" })
  @Prop({ required: true }) // User's weight in kg or lbs
  weight: number;

  @ApiProperty({
    description: 'Optional body fat percentage',
    required: false,
  })
  @Prop({ required: false }) // Optional body fat percentage
  body_fat_percentage?: number;

  @ApiProperty({
    description: 'Optional muscle mass in kg or lbs',
    required: false,
  })
  @Prop({ required: false }) // Optional muscle mass in kg or lbs
  muscle_mass?: number;

  @ApiProperty({
    description: 'Optional notes about the progress',
    required: false,
  })
  @Prop({ required: false }) // Optional notes about the progress
  notes?: string;
}

export const ProgressLogSchema = SchemaFactory.createForClass(ProgressLog);
