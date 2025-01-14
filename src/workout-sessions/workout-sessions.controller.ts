import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateWorkoutSessionDto } from './dto/create-workout-session.dto';
import { UpdateWorkoutSessionDto } from './dto/update-workout-session.dto';
import { WorkoutSessionService } from './workout-sessions.service';
import { WorkoutSession } from './models/workout-session.schema';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('workout-sessions')
@UseGuards(AuthGuard) // Use your custom AuthGuard
export class WorkoutSessionController {
  constructor(private readonly workoutSessionService: WorkoutSessionService) {}

  @Post('create')
  async create(
    @Body() createWorkoutSessionDto: CreateWorkoutSessionDto,
    @Req() request: any,
  ): Promise<WorkoutSession> {
    const userId = request.userId; // Get userId from the request object
    return this.workoutSessionService.create(userId, createWorkoutSessionDto);
  }

  @Get()
  async findAll(@Req() request: any): Promise<WorkoutSession[]> {
    const userId = request.userId; // Get userId from the request object
    return this.workoutSessionService.findAll(userId);
  }

  @Get(':id')
  async findOne(
    @Param('id') session_id: string,
    @Req() request: any,
  ): Promise<WorkoutSession> {
    const userId = request.userId; // Get userId from the request object
    return this.workoutSessionService.findOne(userId, session_id);
  }

  @Put(':id')
  async update(
    @Param('id') session_id: string,
    @Body() updateWorkoutSessionDto: UpdateWorkoutSessionDto,
    @Req() request: any,
  ): Promise<WorkoutSession> {
    const userId = request.userId; // Get userId from the request object
    return this.workoutSessionService.update(
      userId,
      session_id,
      updateWorkoutSessionDto,
    );
  }

  @Delete(':id')
  async delete(
    @Param('id') session_id: string,
    @Req() request: any,
  ): Promise<WorkoutSession> {
    const userId = request.userId; // Get userId from the request object
    return this.workoutSessionService.delete(userId, session_id);
  }
}
