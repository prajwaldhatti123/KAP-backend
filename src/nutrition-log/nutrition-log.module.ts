import { Module } from '@nestjs/common';
import { NutritionLogService } from './nutrition-log.service';
import { NutritionLogController } from './nutrition-log.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NutritionLogSchema } from './models/nutrition-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'NutritionLog', schema: NutritionLogSchema },
    ]),
  ],
  controllers: [NutritionLogController],
  providers: [NutritionLogService],
})
export class NutritionLogModule {}
