import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Routine {
  @Prop({ required: true, ref: 'UserProfile' }) // Reference to the user who created the routine
  user_id: string;

  @Prop({ required: true }) // Name of the routine (e.g., "Chest Day")
  routine_name: string;

  @Prop({ required: false }) // Optional description of the routine
  routine_desc?: string;

  @Prop({ required: false }) // Optional timer for the entire routine
  routine_timer?: number;

  @Prop([
    // List of exercises in the routine
    {
      exercise_id: { type: String, required: true, ref: 'Exercise' }, // Reference to the Exercise collection
      exercise_name: { type: String, required: true }, // Name of the exercise (e.g., "Bench Press")
      exercise_category: { type: String, required: true }, // Category (e.g., "Machine", "Cable")
      body_part: { type: String, required: true }, // Targeted body part (e.g., "Chest", "Legs")
      exercise_main_details: [
        // Main sets for the exercise
        {
          set: { type: Number, required: true }, // Set number (auto-incremented)
          weight_metric: { type: String, required: true, enum: ['kg', 'lbs'] }, // Weight unit (kg or lbs)
          inst_type: { type: String, required: false }, // Instrument type (e.g., "bar", "color")
          weight_value: { type: Number, required: true }, // Weight value (e.g., 100)
          reps: { type: Number, required: true }, // Number of reps
          timer: { type: Number, required: false }, // Optional timer for the set
        },
      ],
      exercise_warmup_details: {
        // Optional warmup sets for the exercise
        type: [
          {
            set: { type: Number, required: true }, // Set number (auto-incremented)
            weight_metric: {
              type: String,
              required: true,
              enum: ['kg', 'lbs'],
            }, // Weight unit (kg or lbs)
            inst_type: { type: String, required: false }, // Instrument type (e.g., "bar", "color")
            weight_value: { type: Number, required: true }, // Weight value (e.g., 50)
            reps: { type: Number, required: true }, // Number of reps
            timer: { type: Number, required: false }, // Optional timer for the set
          },
        ],
        required: false, // Warmup details are optional
      },
    },
  ])
  routine_exercises: {
    exercise_id: string;
    exercise_name: string;
    exercise_category: string;
    body_part: string;
    exercise_main_details: {
      set: number;
      weight_metric: string;
      inst_type?: string;
      weight_value: number;
      reps: number;
      timer?: number;
    }[];
    exercise_warmup_details?: {
      // Optional warmup sets
      set: number;
      weight_metric: string;
      inst_type?: string;
      weight_value: number;
      reps: number;
      timer?: number;
    }[];
  }[];

  @Prop({ required: false }) // Optional difficulty level (e.g., "Beginner", "Intermediate")
  difficulty?: string;

  @Prop({ required: false }) // Optional tags for categorization (e.g., ["Upper Body", "Strength"])
  tags?: string[];
}

export const RoutineSchema = SchemaFactory.createForClass(Routine);
