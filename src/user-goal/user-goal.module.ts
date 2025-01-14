import { Module } from '@nestjs/common';
import { UserGoalService } from './user-goal.service';
import { UserGoalController } from './user-goal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserGoalSchema } from './models/user-gaol.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserGoal', schema: UserGoalSchema }]),
  ],
  controllers: [UserGoalController],
  providers: [UserGoalService],
})
export class UserGoalModule {}
