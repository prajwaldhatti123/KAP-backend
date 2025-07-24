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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateWorkoutSessionDto } from './dto/create-workout-session.dto';
import { UpdateWorkoutSessionDto } from './dto/update-workout-session.dto';
import { WorkoutSessionService } from './workout-sessions.service';
import { WorkoutSession } from './models/workout-session.schema';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('workout-sessions')
@ApiBearerAuth()
@Controller('workout-sessions')
@UseGuards(AuthGuard) // Use your custom AuthGuard
export class WorkoutSessionController {
  constructor(private readonly workoutSessionService: WorkoutSessionService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new workout session' })
  @ApiResponse({
    status: 201,
    description: 'The workout session has been successfully created.',
    type: WorkoutSession,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Body() createWorkoutSessionDto: CreateWorkoutSessionDto,
    @Req() request: any,
  ): Promise<WorkoutSession> {
    const userId = request.userId; // Get userId from the request object
    return this.workoutSessionService.create(userId, createWorkoutSessionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all workout sessions for the user' })
  @ApiResponse({
    status: 200,
    description: 'A list of workout sessions.',
    type: [WorkoutSession],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(@Req() request: any): Promise<WorkoutSession[]> {
    const userId = request.userId; // Get userId from the request object
    return this.workoutSessionService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific workout session' })
  @ApiResponse({
    status: 200,
    description: 'The workout session.',
    type: WorkoutSession,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(
    @Param('id') session_id: string,
    @Req() request: any,
  ): Promise<WorkoutSession> {
    const userId = request.userId; // Get userId from the request object
    return this.workoutSessionService.findOne(userId, session_id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a workout session',
    description: 'Update a workout session. All fields are optional.',
  })
  @ApiResponse({
    status: 200,
    description: 'The workout session has been successfully updated.',
    type: WorkoutSession,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
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
  @ApiOperation({ summary: 'Delete a workout session' })
  @ApiResponse({
    status: 200,
    description: 'The workout session has been successfully deleted.',
    type: WorkoutSession,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async delete(
    @Param('id') session_id: string,
    @Req() request: any,
  ): Promise<WorkoutSession> {
    const userId = request.userId; // Get userId from the request object
    return this.workoutSessionService.delete(userId, session_id);
  }
}
