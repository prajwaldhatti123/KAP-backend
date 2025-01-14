import { Module } from '@nestjs/common';
import { WorkoutSessionController } from './workout-sessions.controller';
import { WorkoutSessionService } from './workout-sessions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutSessionSchema } from './models/workout-session.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'WorkoutSession', schema: WorkoutSessionSchema },
    ]),
  ],
  controllers: [WorkoutSessionController],
  providers: [WorkoutSessionService],
})
export class WorkoutSessionsModule {}
