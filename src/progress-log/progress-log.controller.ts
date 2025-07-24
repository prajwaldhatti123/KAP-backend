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
import { ProgressLogService } from './progress-log.service';
import { CreateProgressLogDto } from './dto/create-progress-log.dto';
import { UpdateProgressLogDto } from './dto/update-progress-log.dto';
import { ProgressLog } from './models/progress-log.schema';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('progress-logs')
@ApiBearerAuth()
@Controller('progress-logs')
@UseGuards(AuthGuard) // Use your custom AuthGuard
export class ProgressLogController {
  constructor(private readonly progressLogService: ProgressLogService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new progress log' })
  @ApiResponse({
    status: 201,
    description: 'The progress log has been successfully created.',
    type: ProgressLog,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Body() createProgressLogDto: CreateProgressLogDto,
    @Req() request: any,
  ): Promise<ProgressLog> {
    const userId = request.userId; // Get userId from the request object
    return this.progressLogService.create(userId, createProgressLogDto);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all progress logs for the user' })
  @ApiResponse({
    status: 200,
    description: 'A list of progress logs.',
    type: [ProgressLog],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(@Req() request: any): Promise<ProgressLog[]> {
    const userId = request.userId; // Get userId from the request object
    return this.progressLogService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific progress log' })
  @ApiResponse({
    status: 200,
    description: 'The progress log.',
    type: ProgressLog,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(
    @Param('id') log_id: string,
    @Req() request: any,
  ): Promise<ProgressLog> {
    const userId = request.userId; // Get userId from the request object
    return this.progressLogService.findOne(userId, log_id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a progress log',
    description: 'Update a progress log. All fields are optional.',
  })
  @ApiResponse({
    status: 200,
    description: 'The progress log has been successfully updated.',
    type: ProgressLog,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Param('id') log_id: string,
    @Body() updateProgressLogDto: UpdateProgressLogDto,
    @Req() request: any,
  ): Promise<ProgressLog> {
    const userId = request.userId; // Get userId from the request object
    return this.progressLogService.update(userId, log_id, updateProgressLogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a progress log' })
  @ApiResponse({
    status: 200,
    description: 'The progress log has been successfully deleted.',
    type: ProgressLog,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async delete(
    @Param('id') log_id: string,
    @Req() request: any,
  ): Promise<ProgressLog> {
    const userId = request.userId; // Get userId from the request object
    return this.progressLogService.delete(userId, log_id);
  }
}
