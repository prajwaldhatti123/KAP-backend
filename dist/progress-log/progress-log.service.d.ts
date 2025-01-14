import { Model } from 'mongoose';
import { CreateProgressLogDto } from './dto/create-progress-log.dto';
import { UpdateProgressLogDto } from './dto/update-progress-log.dto';
import { ProgressLog } from './models/progress-log.schema';
export declare class ProgressLogService {
    private progressLogModel;
    constructor(progressLogModel: Model<ProgressLog>);
    create(user_id: string, createProgressLogDto: CreateProgressLogDto): Promise<ProgressLog>;
    findAll(user_id: string): Promise<ProgressLog[]>;
    findOne(user_id: string, log_id: string): Promise<ProgressLog>;
    update(user_id: string, log_id: string, updateProgressLogDto: UpdateProgressLogDto): Promise<ProgressLog>;
    delete(user_id: string, log_id: string): Promise<ProgressLog>;
}
