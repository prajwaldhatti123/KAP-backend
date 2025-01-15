import { Module } from '@nestjs/common';
import { WorkoutAnalyticsService } from './workout-analytics.service';
import { WorkoutAnalyticsController } from './workout-analytics.controller';

@Module({
  controllers: [WorkoutAnalyticsController],
  providers: [WorkoutAnalyticsService],
})
export class WorkoutAnalyticsModule {}
