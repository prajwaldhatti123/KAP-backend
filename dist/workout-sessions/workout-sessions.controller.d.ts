import { CreateWorkoutSessionDto } from './dto/create-workout-session.dto';
import { UpdateWorkoutSessionDto } from './dto/update-workout-session.dto';
import { WorkoutSessionService } from './workout-sessions.service';
import { WorkoutSession } from './models/workout-session.schema';
export declare class WorkoutSessionController {
    private readonly workoutSessionService;
    constructor(workoutSessionService: WorkoutSessionService);
    create(createWorkoutSessionDto: CreateWorkoutSessionDto, request: any): Promise<WorkoutSession>;
    findAll(request: any): Promise<WorkoutSession[]>;
    findOne(session_id: string, request: any): Promise<WorkoutSession>;
    update(session_id: string, updateWorkoutSessionDto: UpdateWorkoutSessionDto, request: any): Promise<WorkoutSession>;
    delete(session_id: string, request: any): Promise<WorkoutSession>;
}
