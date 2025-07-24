import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class NutritionLog {
  @ApiProperty({ description: "The user's ID" })
  @Prop({ required: true, ref: 'UserProfile' }) // Reference to the user who logged the nutrition
  user_id: string;

  @ApiProperty({ description: 'Date of the nutrition log' })
  @Prop({ required: true }) // Date of the nutrition log
  date: Date;

  @ApiProperty({ description: 'Total calories consumed' })
  @Prop({ required: true }) // Total calories consumed
  calories: number;

  @ApiProperty({ description: 'Total protein consumed (in grams)' })
  @Prop({ required: true }) // Total protein consumed (in grams)
  protein: number;

  @ApiProperty({ description: 'Total carbohydrates consumed (in grams)' })
  @Prop({ required: true }) // Total carbohydrates consumed (in grams)
  carbs: number;

  @ApiProperty({ description: 'Total fats consumed (in grams)' })
  @Prop({ required: true }) // Total fats consumed (in grams)
  fats: number;

  @ApiProperty({
    description: 'Optional meal description',
    required: false,
  })
  @Prop({ required: false }) // Optional meal description
  meal_description?: string;

  @ApiProperty({
    description: 'Optional notes about the nutrition log',
    required: false,
  })
  @Prop({ required: false }) // Optional notes about the nutrition log
  notes?: string;
}

export const NutritionLogSchema = SchemaFactory.createForClass(NutritionLog);
