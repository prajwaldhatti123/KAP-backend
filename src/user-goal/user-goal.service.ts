import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserGoal, UserGoalDocument } from './models/user-gaol.schema';
import { CreateGoalDto } from './dto/create-goal.dto';
import { Model } from 'mongoose';

@Injectable()
export class UserGoalService {
  constructor(
    @InjectModel(UserGoal.name) private userGoalModel: Model<UserGoalDocument>,
  ) {}

  // Create a new goal
  async create(
    user_id: string,
    createGoalDto: CreateGoalDto,
  ): Promise<UserGoal> {
    const goal = new this.userGoalModel({ user_id, ...createGoalDto });
    return goal.save();
  }

  // Find all goals of a user
  async findAll(user_id: string): Promise<UserGoal[]> {
    return this.userGoalModel.find({ user_id }).exec();
  }

  // Update a goal
  //   async update(user_id: string, goal_id: string, updateGoalDto: UpdateGoalDto): Promise<UserGoal> {
  //     return this.userGoalModel.findOneAndUpdate(
  //       { user_id, _id: goal_id },
  //       { $set: updateGoalDto },
  //       { new: true }
  //     );
  //   }

  // Delete a goal
  async delete(user_id: string, goal_id: string): Promise<UserGoal> {
    return this.userGoalModel
      .findOneAndDelete({ user_id, _id: goal_id })
      .exec();
  }
}
