import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class NutritionLog {
  @Prop({ required: true, ref: 'UserProfile' }) // Reference to the user who logged the nutrition
  user_id: string;

  @Prop({ required: true }) // Date of the nutrition log
  date: Date;

  @Prop({ required: true }) // Total calories consumed
  calories: number;

  @Prop({ required: true }) // Total protein consumed (in grams)
  protein: number;

  @Prop({ required: true }) // Total carbohydrates consumed (in grams)
  carbs: number;

  @Prop({ required: true }) // Total fats consumed (in grams)
  fats: number;

  @Prop({ required: false }) // Optional meal description
  meal_description?: string;

  @Prop({ required: false }) // Optional notes about the nutrition log
  notes?: string;
}

export const NutritionLogSchema = SchemaFactory.createForClass(NutritionLog);
