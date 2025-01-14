import { UserGoal, UserGoalDocument } from './models/user-gaol.schema';
import { CreateGoalDto } from './dto/create-goal.dto';
import { Model } from 'mongoose';
export declare class UserGoalService {
    private userGoalModel;
    constructor(userGoalModel: Model<UserGoalDocument>);
    create(user_id: string, createGoalDto: CreateGoalDto): Promise<UserGoal>;
    findAll(user_id: string): Promise<UserGoal[]>;
    delete(user_id: string, goal_id: string): Promise<UserGoal>;
}
