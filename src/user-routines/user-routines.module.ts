import { Module } from '@nestjs/common';
import { UserRoutinesService } from './user-routines.service';
import { UserRoutinesController } from './user-routines.controller';

@Module({
  controllers: [UserRoutinesController],
  providers: [UserRoutinesService],
})
export class UserRoutinesModule {}
