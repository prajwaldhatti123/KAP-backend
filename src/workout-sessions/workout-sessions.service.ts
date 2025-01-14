import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWorkoutSessionDto } from './dto/create-workout-session.dto';
import { UpdateWorkoutSessionDto } from './dto/update-workout-session.dto';
import { WorkoutSession } from './models/workout-session.schema';

@Injectable()
export class WorkoutSessionService {
  constructor(
    @InjectModel(WorkoutSession.name)
    private workoutSessionModel: Model<WorkoutSession>,
  ) {}

  // Create a new workout session
  async create(
    user_id: string,
    createWorkoutSessionDto: CreateWorkoutSessionDto,
  ): Promise<WorkoutSession> {
    const workoutSession = new this.workoutSessionModel({
      user_id,
      ...createWorkoutSessionDto,
    });
    return workoutSession.save();
  }

  // Find all workout sessions for a user
  async findAll(user_id: string): Promise<WorkoutSession[]> {
    return this.workoutSessionModel.find({ user_id }).exec();
  }

  // Find a specific workout session by ID
  async findOne(user_id: string, session_id: string): Promise<WorkoutSession> {
    return this.workoutSessionModel
      .findOne({ user_id, _id: session_id })
      .exec();
  }

  // Update a workout session
  async update(
    user_id: string,
    session_id: string,
    updateWorkoutSessionDto: UpdateWorkoutSessionDto,
  ): Promise<WorkoutSession> {
    return this.workoutSessionModel.findOneAndUpdate(
      { user_id, _id: session_id },
      { $set: updateWorkoutSessionDto },
      { new: true },
    );
  }

  // Delete a workout session
  async delete(user_id: string, session_id: string): Promise<WorkoutSession> {
    return this.workoutSessionModel
      .findOneAndDelete({ user_id, _id: session_id })
      .exec();
  }
}
