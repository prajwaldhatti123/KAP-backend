import { Module } from '@nestjs/common';
import { ProgressLogService } from './progress-log.service';
import { ProgressLogController } from './progress-log.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgressLogSchema } from './models/progress-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProgressLog', schema: ProgressLogSchema },
    ]),
  ],
  controllers: [ProgressLogController],
  providers: [ProgressLogService],
})
export class ProgressLogModule {}
