import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExerciseSchema } from './models/exercise.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Exercise', schema: ExerciseSchema }]),
  ],
  controllers: [ExercisesController],
  providers: [ExercisesService],
})
export class ExercisesModule {}
