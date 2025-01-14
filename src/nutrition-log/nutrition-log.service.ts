import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NutritionLog } from './models/nutrition-log.schema';
import { CreateNutritionLogDto } from './dto/create-nutrition-log.dto';
import { UpdateNutritionLogDto } from './dto/update-nutrition-log.dto copy';

@Injectable()
export class NutritionLogService {
  constructor(
    @InjectModel(NutritionLog.name)
    private nutritionLogModel: Model<NutritionLog>,
  ) {}

  // Create a new nutrition log
  async create(
    user_id: string,
    createNutritionLogDto: CreateNutritionLogDto,
  ): Promise<NutritionLog> {
    const nutritionLog = new this.nutritionLogModel({
      user_id,
      ...createNutritionLogDto,
    });
    return nutritionLog.save();
  }

  // Find all nutrition logs for a user
  async findAll(user_id: string): Promise<NutritionLog[]> {
    return this.nutritionLogModel.find({ user_id }).exec();
  }

  // Find a specific nutrition log by ID
  async findOne(user_id: string, log_id: string): Promise<NutritionLog> {
    return this.nutritionLogModel.findOne({ user_id, _id: log_id }).exec();
  }

  // Update a nutrition log
  async update(
    user_id: string,
    log_id: string,
    updateNutritionLogDto: UpdateNutritionLogDto,
  ): Promise<NutritionLog> {
    return this.nutritionLogModel.findOneAndUpdate(
      { user_id, _id: log_id },
      { $set: updateNutritionLogDto },
      { new: true },
    );
  }

  // Delete a nutrition log
  async delete(user_id: string, log_id: string): Promise<NutritionLog> {
    return this.nutritionLogModel
      .findOneAndDelete({ user_id, _id: log_id })
      .exec();
  }
}
