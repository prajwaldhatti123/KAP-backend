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
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { Routine } from './models/user-routine.schema';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoutineService } from './user-routines.service';

@Controller('routines')
@UseGuards(AuthGuard) // Use your custom AuthGuard
export class RoutineController {
  constructor(private readonly routineService: RoutineService) {}

  @Post('create')
  async create(
    @Body() createRoutineDto: CreateRoutineDto,
    @Req() request: any,
  ): Promise<Routine> {
    const userId = request.userId; // Get userId from the request object
    return this.routineService.create(userId, createRoutineDto);
  }

  @Get('getAll')
  async findAll(@Req() request: any): Promise<Routine[]> {
    const userId = request.userId; // Get userId from the request object
    return this.routineService.findAll(userId);
  }

  @Get('routine/:id')
  async findOne(
    @Param('id') routine_id: string,
    @Req() request: any,
  ): Promise<Routine> {
    const userId = request.userId; // Get userId from the request object
    return this.routineService.findOne(userId, routine_id);
  }

  @Put('routine/:id')
  async update(
    @Param('id') routine_id: string,
    @Body() updateRoutineDto: UpdateRoutineDto,
    @Req() request: any,
  ): Promise<Routine> {
    const userId = request.userId; // Get userId from the request object
    return this.routineService.update(userId, routine_id, updateRoutineDto);
  }

  @Delete('routine/:id')
  async delete(
    @Param('id') routine_id: string,
    @Req() request: any,
  ): Promise<Routine> {
    const userId = request.userId; // Get userId from the request object
    return this.routineService.delete(userId, routine_id);
  }
}
