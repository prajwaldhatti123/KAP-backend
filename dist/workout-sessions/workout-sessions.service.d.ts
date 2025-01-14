import { Model } from 'mongoose';
import { CreateWorkoutSessionDto } from './dto/create-workout-session.dto';
import { UpdateWorkoutSessionDto } from './dto/update-workout-session.dto';
import { WorkoutSession } from './models/workout-session.schema';
export declare class WorkoutSessionService {
    private workoutSessionModel;
    constructor(workoutSessionModel: Model<WorkoutSession>);
    create(user_id: string, createWorkoutSessionDto: CreateWorkoutSessionDto): Promise<WorkoutSession>;
    findAll(user_id: string): Promise<WorkoutSession[]>;
    findOne(user_id: string, session_id: string): Promise<WorkoutSession>;
    update(user_id: string, session_id: string, updateWorkoutSessionDto: UpdateWorkoutSessionDto): Promise<WorkoutSession>;
    delete(user_id: string, session_id: string): Promise<WorkoutSession>;
}
