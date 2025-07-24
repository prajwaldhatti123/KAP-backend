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
    description: 'Optional notes for the set',
    example: 'Good form',
    required: false,
  })
  notes?: string;
}

class WorkoutSessionExercise {
  @ApiProperty({ description: 'ID of the exercise' })
  exercise_id: string;

  @ApiProperty({ description: 'Name of the exercise', example: 'Bench Press' })
  exercise_name: string;

  @ApiProperty({ description: 'Category of the exercise', example: 'Machine' })
  exercise_category: string;

  @ApiProperty({ description: 'Targeted body part', example: 'Chest' })
  body_part: string;

  @ApiProperty({ type: [ExerciseSet] })
  main_sets: ExerciseSet[];

  @ApiProperty({ type: [ExerciseSet] })
  warmup_sets: ExerciseSet[];
}

@Schema({ timestamps: true })
export class WorkoutSession {
  @ApiProperty({ description: "The user's ID" })
  @Prop({ required: true, ref: 'UserProfile' }) // Reference to the user who logged the session
  user_id: string;

  @ApiProperty({ description: 'The ID of the routine used for the session' })
  @Prop({ required: true, ref: 'Routine' }) // Reference to the routine used for the session
  routine_id: string;

  @ApiProperty({ description: 'Date of the workout session' })
  @Prop({ required: true }) // Date of the workout session
  date: Date;

  @ApiProperty({ type: [WorkoutSessionExercise] })
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
  exercises: WorkoutSessionExercise[];

  @ApiProperty({
    description: 'Optional session duration in minutes',
    example: 60,
    required: false,
  })
  @Prop({ required: false, default: null }) // Optional session duration in minutes
  duration?: number;

  @ApiProperty({
    description: 'Optional notes for the session',
    example: 'Felt a bit tired today',
    required: false,
  })
  @Prop({ required: false, default: null }) // Optional notes for the session
  notes?: string;
}

export const WorkoutSessionSchema =
  SchemaFactory.createForClass(WorkoutSession);
