import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { Routine } from './models/user-routine.schema';

@Injectable()
export class RoutineService {
  constructor(
    @InjectModel(Routine.name) private routineModel: Model<Routine>,
  ) {}

  // Create a new routine
  async create(
    user_id: string,
    createRoutineDto: CreateRoutineDto,
  ): Promise<Routine> {
    const routine = new this.routineModel({ user_id, ...createRoutineDto });
    return routine.save();
  }

  // Find all routines for a user
  async findAll(user_id: string): Promise<Routine[]> {
    return this.routineModel.find({ user_id }).exec();
  }

  // Find a specific routine by ID
  async findOne(user_id: string, routine_id: string): Promise<Routine> {
    return this.routineModel.findOne({ user_id, _id: routine_id }).exec();
  }

  // Update a routine
  async update(
    user_id: string,
    routine_id: string,
    updateRoutineDto: UpdateRoutineDto,
  ): Promise<Routine> {
    return this.routineModel.findOneAndUpdate(
      { user_id, _id: routine_id },
      { $set: updateRoutineDto },
      { new: true },
    );
  }

  // Delete a routine
  async delete(user_id: string, routine_id: string): Promise<Routine> {
    return this.routineModel
      .findOneAndDelete({ user_id, _id: routine_id })
      .exec();
  }
}
