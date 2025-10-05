import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutAnalyticsService } from './workout-analytics.service';
import { WorkoutAnalyticsController } from './workout-analytics.controller';
import { WorkoutSession, WorkoutSessionSchema } from '../workout-sessions/models/workout-session.schema';
import { UserGoal, UserGoalSchema } from '../user-goal/models/user-goal.schema';
import { ProgressLog, ProgressLogSchema } from '../progress-log/models/progress-log.schema';
import { NutritionLog, NutritionLogSchema } from '../nutrition-log/models/nutrition-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkoutSession.name, schema: WorkoutSessionSchema },
      { name: UserGoal.name, schema: UserGoalSchema },
      { name: ProgressLog.name, schema: ProgressLogSchema },
      { name: NutritionLog.name, schema: NutritionLogSchema },
    ]),
  ],
  controllers: [WorkoutAnalyticsController],
  providers: [WorkoutAnalyticsService],
  exports: [WorkoutAnalyticsService],
})
export class WorkoutAnalyticsModule {}
