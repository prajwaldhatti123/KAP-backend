import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkoutSession } from 'src/workout-sessions/models/workout-session.schema';
import { VolumeTrendByMuscleGroup } from './interfaces/outputInterfaces';

@Injectable()
export class WorkoutAnalyticsService {
  constructor(
    @InjectModel(WorkoutSession.name)
    private workoutSessionModel: Model<WorkoutSession>,
  ) {}

  // 1. Workout Volume Trends
  async getWorkoutVolumeTrends(
    user_id: string,
  ): Promise<VolumeTrendByMuscleGroup[]> {
    // Input validation
    if (!user_id) {
      throw new BadRequestException('User ID is required');
    }

    try {
      // Fetch sessions for the user
      const sessions = await this.workoutSessionModel.find({ user_id }).exec();

      // Check if sessions exist
      if (!sessions.length) {
        throw new NotFoundException('No sessions found for the user');
      }

      // Calculate volume trends by muscle group
      const volumeTrends = sessions.map((session) => {
        const muscleGroups: { [muscleGroup: string]: number } = {};

        session.exercises.forEach((exercise) => {
          const totalVolume = exercise.main_sets.reduce(
            (sum, set) => sum + set.weight_value * set.reps,
            0,
          );

          // Add volume to the corresponding muscle group
          if (muscleGroups[exercise.body_part]) {
            muscleGroups[exercise.body_part] += totalVolume;
          } else {
            muscleGroups[exercise.body_part] = totalVolume;
          }
        });

        return {
          date: session.date,
          muscleGroups,
        };
      });

      return volumeTrends;
    } catch (error) {
      // Handle errors
      throw new BadRequestException(
        'Failed to calculate workout volume trends',
      );
    }
  }

  // 2. Strength Progress
  async getStrengthProgress(
    user_id: string,
    exercise_id: string,
  ): Promise<any> {
    const sessions = await this.workoutSessionModel.find({ user_id }).exec();
    const strengthProgress = sessions
      .filter((session) =>
        session.exercises.some(
          (exercise) => exercise.exercise_id === exercise_id,
        ),
      )
      .map((session) => ({
        date: session.date,
        maxWeight: Math.max(
          ...session.exercises
            .filter((exercise) => exercise.exercise_id === exercise_id)
            .flatMap((exercise) =>
              exercise.main_sets.map((set) => set.weight_value),
            ),
        ),
      }));
    return strengthProgress;
  }

  // 3. Workout Frequency
  async getWorkoutFrequency(user_id: string): Promise<any> {
    const sessions = await this.workoutSessionModel.find({ user_id }).exec();
    const frequency = sessions.reduce((acc, session) => {
      const week = this.getWeekNumber(session.date);
      acc[week] = (acc[week] || 0) + 1;
      return acc;
    }, {});
    return frequency;
  }

  // 4. Exercise Performance
  async getExercisePerformance(user_id: string): Promise<any> {
    const sessions = await this.workoutSessionModel.find({ user_id }).exec();
    const performance = sessions.reduce((acc, session) => {
      session.exercises.forEach((exercise) => {
        const totalVolume = exercise.main_sets.reduce(
          (sum, set) => sum + set.weight_value * set.reps,
          0,
        );
        acc[exercise.exercise_name] =
          (acc[exercise.exercise_name] || 0) + totalVolume;
      });
      return acc;
    }, {});
    return performance;
  }

  // 5. Rest Time Analysis
  async getRestTimeAnalysis(user_id: string): Promise<any> {
    const sessions = await this.workoutSessionModel.find({ user_id }).exec();
    const restTimes = sessions
      .flatMap((session) =>
        session.exercises.flatMap((exercise) =>
          exercise.main_sets.map(
            (set) => set.notes?.match(/Rest: (\d+) seconds/)?.[1],
          ),
        ),
      )
      .filter(Boolean);
    const averageRestTime =
      restTimes.reduce((sum, time) => sum + parseInt(time), 0) /
      restTimes.length;
    return { averageRestTime };
  }

  // 6. Workout Duration
  async getWorkoutDuration(user_id: string): Promise<any> {
    const sessions = await this.workoutSessionModel.find({ user_id }).exec();
    const durations = sessions.map((session) => ({
      date: session.date,
      duration: session.exercises.reduce(
        (sum, exercise) => sum + exercise.main_sets.length * 3,
        0,
      ), // Assuming 3 minutes per set
    }));
    return durations;
  }

  // 7. Exercise Volume Distribution
  async getExerciseVolumeDistribution(user_id: string): Promise<any> {
    const sessions = await this.workoutSessionModel.find({ user_id }).exec();
    const volumeDistribution = sessions.reduce((acc, session) => {
      session.exercises.forEach((exercise) => {
        const totalVolume = exercise.main_sets.reduce(
          (sum, set) => sum + set.weight_value * set.reps,
          0,
        );
        acc[exercise.exercise_name] =
          (acc[exercise.exercise_name] || 0) + totalVolume;
      });
      return acc;
    }, {});
    return volumeDistribution;
  }

  // 8. One-Rep Max (1RM) Estimation
  async getOneRepMax(user_id: string, exercise_id: string): Promise<any> {
    const sessions = await this.workoutSessionModel.find({ user_id }).exec();
    const oneRepMax = sessions
      .filter((session) =>
        session.exercises.some(
          (exercise) => exercise.exercise_id === exercise_id,
        ),
      )
      .map((session) => ({
        date: session.date,
        oneRepMax: Math.max(
          ...session.exercises
            .filter((exercise) => exercise.exercise_id === exercise_id)
            .flatMap((exercise) =>
              exercise.main_sets.map(
                (set) => set.weight_value * (1 + set.reps / 30),
              ),
            ),
        ), // Epley formula
      }));
    return oneRepMax;
  }

  // 9. Recovery Analysis
  async getRecoveryAnalysis(user_id: string): Promise<any> {
    const sessions = await this.workoutSessionModel.find({ user_id }).exec();
    const highIntensityWorkouts = sessions.filter((session) =>
      session.exercises.some(
        (exercise) =>
          exercise.main_sets.some(
            (set) => set.weight_value > 0.8 * set.weight_value,
          ), // Assuming 80% of max weight is high intensity
      ),
    ).length;
    return {
      highIntensityWorkouts,
      suggestion:
        highIntensityWorkouts > 3 ? 'Consider a rest day' : 'You’re on track',
    };
  }

  // 10. Plateau Detection
  async getPlateauDetection(
    user_id: string,
    exercise_id: string,
  ): Promise<any> {
    const sessions = await this.workoutSessionModel.find({ user_id }).exec();
    const strengthProgress = sessions
      .filter((session) =>
        session.exercises.some(
          (exercise) => exercise.exercise_id === exercise_id,
        ),
      )
      .map((session) => ({
        date: session.date,
        maxWeight: Math.max(
          ...session.exercises
            .filter((exercise) => exercise.exercise_id === exercise_id)
            .flatMap((exercise) =>
              exercise.main_sets.map((set) => set.weight_value),
            ),
        ),
      }));
    const plateau = strengthProgress
      .slice(-3)
      .every(
        (entry, i, arr) => i === 0 || entry.maxWeight === arr[i - 1].maxWeight,
      );
    return {
      plateau,
      suggestion: plateau
        ? 'Consider increasing volume or changing exercises'
        : 'No plateau detected',
    };
  }

  // Helper function to get week number
  private getWeekNumber(date: Date): string {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - startOfYear.getTime()) / 86400000;
    return `Week ${Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7)}`;
  }
}
