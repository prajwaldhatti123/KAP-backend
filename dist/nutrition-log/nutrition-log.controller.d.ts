import { NutritionLogService } from './nutrition-log.service';
import { CreateNutritionLogDto } from './dto/create-nutrition-log.dto';
import { NutritionLog } from './models/nutrition-log.schema';
import { UpdateNutritionLogDto } from './dto/update-nutrition-log.dto copy';
export declare class NutritionLogController {
    private readonly nutritionLogService;
    constructor(nutritionLogService: NutritionLogService);
    create(createNutritionLogDto: CreateNutritionLogDto, request: any): Promise<NutritionLog>;
    findAll(request: any): Promise<NutritionLog[]>;
    findOne(log_id: string, request: any): Promise<NutritionLog>;
    update(log_id: string, updateNutritionLogDto: UpdateNutritionLogDto, request: any): Promise<NutritionLog>;
    delete(log_id: string, request: any): Promise<NutritionLog>;
}
