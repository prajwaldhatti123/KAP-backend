import { PartialType } from '@nestjs/mapped-types';
import { CreateNutritionLogDto } from './create-nutrition-log.dto';

export class UpdateNutritionLogDto extends PartialType(CreateNutritionLogDto) {}
