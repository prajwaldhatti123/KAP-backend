import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Exercise extends Document {
  @Prop({ required: true, unique: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: string;

  @Prop({ type: [String], default: ['None'] })
  equipment: string[];

  @Prop({ type: [String], required: true })
  musclesTargeted: string[];

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  variations: string[];

  @Prop({ required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] })
  difficulty: string;

  @Prop({
    type: {
      durationBased: Boolean,
      repBased: Boolean,
    },
    required: true,
  })
  attributes: {
    durationBased: boolean;
    repBased: boolean;
  };

  @Prop()
  image: string;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);