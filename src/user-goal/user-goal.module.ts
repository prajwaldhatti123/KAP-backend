import { Module } from '@nestjs/common';
import { UserGoalService } from './user-goal.service';
import { UserGoalController } from './user-goal.controller';

@Module({
  controllers: [UserGoalController],
  providers: [UserGoalService],
})
export class UserGoalModule {}
