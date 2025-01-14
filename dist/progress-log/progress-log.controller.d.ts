import { ProgressLogService } from './progress-log.service';
import { CreateProgressLogDto } from './dto/create-progress-log.dto';
import { UpdateProgressLogDto } from './dto/update-progress-log.dto';
import { ProgressLog } from './models/progress-log.schema';
export declare class ProgressLogController {
    private readonly progressLogService;
    constructor(progressLogService: ProgressLogService);
    create(createProgressLogDto: CreateProgressLogDto, request: any): Promise<ProgressLog>;
    findAll(request: any): Promise<ProgressLog[]>;
    findOne(log_id: string, request: any): Promise<ProgressLog>;
    update(log_id: string, updateProgressLogDto: UpdateProgressLogDto, request: any): Promise<ProgressLog>;
    delete(log_id: string, request: any): Promise<ProgressLog>;
}
