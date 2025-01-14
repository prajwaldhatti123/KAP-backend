import { UserGoalService } from './user-goal.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UserGoal } from './models/user-gaol.schema';
export declare class UserGoalController {
    private readonly userGoalService;
    constructor(userGoalService: UserGoalService);
    create(createGoalDto: CreateGoalDto, req: any): Promise<UserGoal>;
    findAll(req: any): Promise<UserGoal[]>;
    delete(goal_id: string, req: any): Promise<UserGoal>;
}
