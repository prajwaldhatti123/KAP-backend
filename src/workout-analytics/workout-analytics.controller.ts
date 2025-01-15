import { Controller } from '@nestjs/common';
import { WorkoutAnalyticsService } from './workout-analytics.service';

@Controller('workout-analytics')
export class WorkoutAnalyticsController {
  constructor(private readonly workoutAnalyticsService: WorkoutAnalyticsService) {}
}
