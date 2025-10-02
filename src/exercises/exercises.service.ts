import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exercise } from './models/exercise.schema';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectModel('Exercise') private exerciseModel: Model<Exercise>,
  ) {}

  create(createExerciseDto: CreateExerciseDto) {
    const exercise = new this.exerciseModel(createExerciseDto);
    return exercise.save();
    return 'This action adds a new exercise';
  }

  findAll() {
    return this.exerciseModel.find().exec();
  }

  findOne(id: number) {
    return this.exerciseModel.findById(id);
  }

  update(id: number, updateExerciseDto: UpdateExerciseDto) {
    return this.exerciseModel.findByIdAndUpdate(id, updateExerciseDto);
  }

  remove(id: number) {
    return this.exerciseModel.findByIdAndDelete(id);
  }
}
