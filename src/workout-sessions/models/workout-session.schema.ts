import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class WorkoutSession {
  @Prop({ required: true, ref: 'UserProfile' }) // Reference to the user who logged the session
  user_id: string;

  @Prop({ required: true, ref: 'Routine' }) // Reference to the routine used for the session
  routine_id: string;

  @Prop({ required: true }) // Date of the workout session
  date: Date;

  @Prop([
    // List of exercises performed in the session
    {
      exercise_id: { type: String, required: true, ref: 'Exercise' }, // Reference to the Exercise collection
      exercise_name: { type: String, required: true }, // Name of the exercise
      exercise_category: { type: String, required: true }, // Category of the exercise
      body_part: { type: String, required: true }, // Targeted body part
      main_sets: {
        // Main sets performed for the exercise
        type: [
          {
            set: { type: Number, required: true }, // Set number
            weight_metric: {
              type: String,
              required: true,
              enum: ['kg', 'lbs'],
            }, // Weight unit (kg or lbs)
            inst_type: { type: String, required: false }, // Instrument type (e.g., "bar", "color")
            weight_value: { type: Number, required: true }, // Weight value
            reps: { type: Number, required: true }, // Number of reps
            notes: { type: String, required: false }, // Optional notes for the set
          },
        ],
        default: [], // Default to an empty array if not provided
      },
      warmup_sets: {
        // Optional warmup sets for the exercise
        type: [
          {
            set: { type: Number, required: true }, // Set number
            weight_metric: {
              type: String,
              required: true,
              enum: ['kg', 'lbs'],
            }, // Weight unit (kg or lbs)
            inst_type: { type: String, required: false }, // Instrument type (e.g., "bar", "color")
            weight_value: { type: Number, required: true }, // Weight value
            reps: { type: Number, required: true }, // Number of reps
            notes: { type: String, required: false }, // Optional notes for the set
          },
        ],
        default: [], // Default to an empty array if not provided
      },
    },
  ])
  exercises: {
    exercise_id: string;
    exercise_name: string;
    exercise_category: string;
    body_part: string;
    main_sets: {
      set: number;
      weight_metric: string;
      inst_type?: string;
      weight_value: number;
      reps: number;
      notes?: string;
    }[];
    warmup_sets: {
      // Always present, but can be empty
      set: number;
      weight_metric: string;
      inst_type?: string;
      weight_value: number;
      reps: number;
      notes?: string;
    }[];
  }[];

  @Prop({ required: false, default: null }) // Optional session duration in minutes
  duration?: number;

  @Prop({ required: false, default: null }) // Optional notes for the session
  notes?: string;
}

export const WorkoutSessionSchema =
  SchemaFactory.createForClass(WorkoutSession);
