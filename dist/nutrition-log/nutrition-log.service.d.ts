import { Model } from 'mongoose';
import { NutritionLog } from './models/nutrition-log.schema';
import { CreateNutritionLogDto } from './dto/create-nutrition-log.dto';
import { UpdateNutritionLogDto } from './dto/update-nutrition-log.dto copy';
export declare class NutritionLogService {
    private nutritionLogModel;
    constructor(nutritionLogModel: Model<NutritionLog>);
    create(user_id: string, createNutritionLogDto: CreateNutritionLogDto): Promise<NutritionLog>;
    findAll(user_id: string): Promise<NutritionLog[]>;
    findOne(user_id: string, log_id: string): Promise<NutritionLog>;
    update(user_id: string, log_id: string, updateNutritionLogDto: UpdateNutritionLogDto): Promise<NutritionLog>;
    delete(user_id: string, log_id: string): Promise<NutritionLog>;
}
