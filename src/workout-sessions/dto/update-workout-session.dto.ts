import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkoutSessionDto } from './create-workout-session.dto';

export class UpdateWorkoutSessionDto extends PartialType(
  CreateWorkoutSessionDto,
) {}
