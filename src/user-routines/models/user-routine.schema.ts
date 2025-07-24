import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

class ExerciseSet {
  @ApiProperty({ description: 'Set number', example: 1 })
  set: number;

  @ApiProperty({ description: 'Weight metric (kg or lbs)', example: 'kg' })
  weight_metric: string;

  @ApiProperty({
    description: 'Instrument type (e.g., "bar", "color")',
    example: 'bar',
    required: false,
  })
  inst_type?: string;

  @ApiProperty({ description: 'Weight value', example: 100 })
  weight_value: number;

  @ApiProperty({ description: 'Number of reps', example: 12 })
  reps: number;

  @ApiProperty({
    description: 'Optional timer for the set in seconds',
    example: 60,
    required: false,
  })
  timer?: number;
}

class RoutineExercise {
  @ApiProperty({ description: 'ID of the exercise' })
  exercise_id: string;

  @ApiProperty({ description: 'Name of the exercise', example: 'Bench Press' })
  exercise_name: string;

  @ApiProperty({ description: 'Category of the exercise', example: 'Machine' })
  exercise_category: string;

  @ApiProperty({ description: 'Targeted body part', example: 'Chest' })
  body_part: string;

  @ApiProperty({ type: [ExerciseSet] })
  exercise_main_details: ExerciseSet[];

  @ApiProperty({ type: [ExerciseSet], required: false })
  exercise_warmup_details?: ExerciseSet[];
}

@Schema({ timestamps: true })
export class Routine {
  @ApiProperty({ description: "The user's ID" })
  @Prop({ required: true, ref: 'UserProfile' }) // Reference to the user who created the routine
  user_id: string;

  @ApiProperty({
    description: 'Name of the routine (e.g., "Chest Day")',
    example: 'Chest Day',
  })
  @Prop({ required: true }) // Name of the routine (e.g., "Chest Day")
  routine_name: string;

  @ApiProperty({
    description: 'Optional description of the routine',
    example: 'A routine focused on chest exercises',
    required: false,
  })
  @Prop({ required: false }) // Optional description of the routine
  routine_desc?: string;

  @ApiProperty({
    description: 'Optional timer for the entire routine in seconds',
    example: 3600,
    required: false,
  })
  @Prop({ required: false }) // Optional timer for the entire routine
  routine_timer?: number;

  @ApiProperty({ type: [RoutineExercise] })
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
  routine_exercises: RoutineExercise[];

  @ApiProperty({
    description: 'Optional difficulty level (e.g., "Beginner", "Intermediate")',
    example: 'Intermediate',
    required: false,
  })
  @Prop({ required: false }) // Optional difficulty level (e.g., "Beginner", "Intermediate")
  difficulty?: string;

  @ApiProperty({
    description:
      'Optional tags for categorization (e.g., ["Upper Body", "Strength"])',
    example: ['Upper Body', 'Strength'],
    required: false,
  })
  @Prop({ required: false }) // Optional tags for categorization (e.g., ["Upper Body", "Strength"])
  tags?: string[];
}

export const RoutineSchema = SchemaFactory.createForClass(Routine);
