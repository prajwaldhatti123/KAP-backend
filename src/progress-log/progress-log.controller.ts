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
import { ProgressLogService } from './progress-log.service';
import { CreateProgressLogDto } from './dto/create-progress-log.dto';
import { UpdateProgressLogDto } from './dto/update-progress-log.dto';
import { ProgressLog } from './models/progress-log.schema';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('progress-logs')
@UseGuards(AuthGuard) // Use your custom AuthGuard
export class ProgressLogController {
  constructor(private readonly progressLogService: ProgressLogService) {}

  @Post('create')
  async create(
    @Body() createProgressLogDto: CreateProgressLogDto,
    @Req() request: any,
  ): Promise<ProgressLog> {
    const userId = request.userId; // Get userId from the request object
    return this.progressLogService.create(userId, createProgressLogDto);
  }

  @Get('getAll')
  async findAll(@Req() request: any): Promise<ProgressLog[]> {
    const userId = request.userId; // Get userId from the request object
    return this.progressLogService.findAll(userId);
  }

  @Get(':id')
  async findOne(
    @Param('id') log_id: string,
    @Req() request: any,
  ): Promise<ProgressLog> {
    const userId = request.userId; // Get userId from the request object
    return this.progressLogService.findOne(userId, log_id);
  }

  @Put(':id')
  async update(
    @Param('id') log_id: string,
    @Body() updateProgressLogDto: UpdateProgressLogDto,
    @Req() request: any,
  ): Promise<ProgressLog> {
    const userId = request.userId; // Get userId from the request object
    return this.progressLogService.update(userId, log_id, updateProgressLogDto);
  }

  @Delete(':id')
  async delete(
    @Param('id') log_id: string,
    @Req() request: any,
  ): Promise<ProgressLog> {
    const userId = request.userId; // Get userId from the request object
    return this.progressLogService.delete(userId, log_id);
  }
}
