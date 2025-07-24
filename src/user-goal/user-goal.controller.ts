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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserGoalService } from './user-goal.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UserGoal } from './models/user-goal.schema';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('goals')
@ApiBearerAuth()
@Controller('goals')
@UseGuards(AuthGuard)
export class UserGoalController {
  constructor(private readonly userGoalService: UserGoalService) {}

  @Post('setGoal')
  @ApiOperation({ summary: 'Set a new goal' })
  @ApiResponse({
    status: 201,
    description: 'The goal has been successfully created.',
    type: UserGoal,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard)
  async create(
    @Body() createGoalDto: CreateGoalDto,
    @Req() req: any,
  ): Promise<UserGoal> {
    return this.userGoalService.create(req.userId, createGoalDto);
  }

  @Get('getGoal')
  @ApiOperation({ summary: 'Get all goals for the user' })
  @ApiResponse({
    status: 200,
    description: 'A list of goals.',
    type: [UserGoal],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard)
  async findAll(@Req() req: any): Promise<UserGoal[]> {
    return this.userGoalService.findAll(req.userId);
  }

  @Delete('deleteGoal/:id')
  @ApiOperation({ summary: 'Delete a goal' })
  @ApiResponse({
    status: 200,
    description: 'The goal has been successfully deleted.',
    type: UserGoal,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard)
  async delete(
    @Param('id') goal_id: string,
    @Req() req: any,
  ): Promise<UserGoal> {
    return this.userGoalService.delete(req.userId, goal_id);
  }
}
