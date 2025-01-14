import { Module } from '@nestjs/common';
import { RoutineController } from './user-routines.controller';
import { RoutineService } from './user-routines.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoutineSchema } from './models/user-routine.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Routine', schema: RoutineSchema }]),
  ],
  controllers: [RoutineController],
  providers: [RoutineService],
})
export class UserRoutinesModule {}
