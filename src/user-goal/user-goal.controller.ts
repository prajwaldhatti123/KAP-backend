import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserGoalService } from './user-goal.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UserGoal } from './models/user-gaol.schema';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('goals')
@UseGuards(AuthGuard)
export class UserGoalController {
  constructor(private readonly userGoalService: UserGoalService) {}

  @Post('setGoal')
  @UseGuards(AuthGuard)
  async create(
    @Body() createGoalDto: CreateGoalDto,
    @Req() req: any,
  ): Promise<UserGoal> {
    return this.userGoalService.create(req.userId, createGoalDto);
  }

  @Get('getGoal')
  @UseGuards(AuthGuard)
  async findAll(@Req() req: any): Promise<UserGoal[]> {
    return this.userGoalService.findAll(req.userId);
  }

  @Delete('deleteGoal/:id')
  @UseGuards(AuthGuard)
  async delete(
    @Param('id') goal_id: string,
    @Req() req: any,
  ): Promise<UserGoal> {
    return this.userGoalService.delete(req.userId, goal_id);
  }
}
