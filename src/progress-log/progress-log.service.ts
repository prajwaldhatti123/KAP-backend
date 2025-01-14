import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProgressLogDto } from './dto/create-progress-log.dto';
import { UpdateProgressLogDto } from './dto/update-progress-log.dto';
import { ProgressLog } from './models/progress-log.schema';

@Injectable()
export class ProgressLogService {
  constructor(
    @InjectModel(ProgressLog.name) private progressLogModel: Model<ProgressLog>,
  ) {}

  // Create a new progress log
  async create(
    user_id: string,
    createProgressLogDto: CreateProgressLogDto,
  ): Promise<ProgressLog> {
    const progressLog = new this.progressLogModel({
      user_id,
      ...createProgressLogDto,
    });
    return progressLog.save();
  }

  // Find all progress logs for a user
  async findAll(user_id: string): Promise<ProgressLog[]> {
    return this.progressLogModel.find({ user_id }).exec();
  }

  // Find a specific progress log by ID
  async findOne(user_id: string, log_id: string): Promise<ProgressLog> {
    return this.progressLogModel.findOne({ user_id, _id: log_id }).exec();
  }

  // Update a progress log
  async update(
    user_id: string,
    log_id: string,
    updateProgressLogDto: UpdateProgressLogDto,
  ): Promise<ProgressLog> {
    return this.progressLogModel.findOneAndUpdate(
      { user_id, _id: log_id },
      { $set: updateProgressLogDto },
      { new: true },
    );
  }

  // Delete a progress log
  async delete(user_id: string, log_id: string): Promise<ProgressLog> {
    return this.progressLogModel
      .findOneAndDelete({ user_id, _id: log_id })
      .exec();
  }
}
