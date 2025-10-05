import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { WorkoutAnalyticsService } from './workout-analytics.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('analytics')
@UseGuards(AuthGuard)
export class WorkoutAnalyticsController {
  constructor(private readonly workoutAnalyticsService: WorkoutAnalyticsService) {}

  @Get('dashboard-stats')
  async getDashboardStats(@Request() req) {
    const user_id = req.user._id;
    return await this.workoutAnalyticsService.getDashboardStats(user_id);
  }

  @Get('volume-trends')
  async getVolumeTrends(@Request() req) {
    const user_id = req.user._id;
    return await this.workoutAnalyticsService.getWorkoutVolumeTrends(user_id);
  }

  @Get('strength-progress/:exercise_id')
  async getStrengthProgress(@Request() req, @Param('exercise_id') exercise_id: string) {
    const user_id = req.user._id;
    return await this.workoutAnalyticsService.getStrengthProgress(user_id, exercise_id);
  }

  @Get('workout-frequency')
  async getWorkoutFrequency(@Request() req) {
    const user_id = req.user._id;
    return await this.workoutAnalyticsService.getWorkoutFrequency(user_id);
  }

  @Get('exercise-performance')
  async getExercisePerformance(@Request() req) {
    const user_id = req.user._id;
    return await this.workoutAnalyticsService.getExercisePerformance(user_id);
  }

  @Get('workout-duration')
  async getWorkoutDuration(@Request() req) {
    const user_id = req.user._id;
    return await this.workoutAnalyticsService.getWorkoutDuration(user_id);
  }

  @Get('volume-distribution')
  async getVolumeDistribution(@Request() req) {
    const user_id = req.user._id;
    return await this.workoutAnalyticsService.getExerciseVolumeDistribution(user_id);
  }

  @Get('one-rep-max/:exercise_id')
  async getOneRepMax(@Request() req, @Param('exercise_id') exercise_id: string) {
    const user_id = req.user._id;
    return await this.workoutAnalyticsService.getOneRepMax(user_id, exercise_id);
  }

  @Get('recovery-analysis')
  async getRecoveryAnalysis(@Request() req) {
    const user_id = req.user._id;
    return await this.workoutAnalyticsService.getRecoveryAnalysis(user_id);
  }

  @Get('plateau-detection/:exercise_id')
  async getPlateauDetection(@Request() req, @Param('exercise_id') exercise_id: string) {
    const user_id = req.user._id;
    return await this.workoutAnalyticsService.getPlateauDetection(user_id, exercise_id);
  }
}
