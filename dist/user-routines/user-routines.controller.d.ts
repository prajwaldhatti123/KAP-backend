import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { Routine } from './models/user-routine.schema';
import { RoutineService } from './user-routines.service';
export declare class RoutineController {
    private readonly routineService;
    constructor(routineService: RoutineService);
    create(createRoutineDto: CreateRoutineDto, request: any): Promise<Routine>;
    findAll(request: any): Promise<Routine[]>;
    findOne(routine_id: string, request: any): Promise<Routine>;
    update(routine_id: string, updateRoutineDto: UpdateRoutineDto, request: any): Promise<Routine>;
    delete(routine_id: string, request: any): Promise<Routine>;
}
