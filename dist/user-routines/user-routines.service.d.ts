import { Model } from 'mongoose';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { Routine } from './models/user-routine.schema';
export declare class RoutineService {
    private routineModel;
    constructor(routineModel: Model<Routine>);
    create(user_id: string, createRoutineDto: CreateRoutineDto): Promise<Routine>;
    findAll(user_id: string): Promise<Routine[]>;
    findOne(user_id: string, routine_id: string): Promise<Routine>;
    update(user_id: string, routine_id: string, updateRoutineDto: UpdateRoutineDto): Promise<Routine>;
    delete(user_id: string, routine_id: string): Promise<Routine>;
}
