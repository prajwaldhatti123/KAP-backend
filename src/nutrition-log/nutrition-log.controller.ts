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
import { NutritionLogService } from './nutrition-log.service';
import { CreateNutritionLogDto } from './dto/create-nutrition-log.dto';
import { NutritionLog } from './models/nutrition-log.schema';
import { UpdateNutritionLogDto } from './dto/update-nutrition-log.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('nutrition-logs')
@ApiBearerAuth()
@Controller('nutrition-logs')
@UseGuards(AuthGuard) // Use your custom AuthGuard
export class NutritionLogController {
  constructor(private readonly nutritionLogService: NutritionLogService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new nutrition log' })
  @ApiResponse({
    status: 201,
    description: 'The nutrition log has been successfully created.',
    type: NutritionLog,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Body() createNutritionLogDto: CreateNutritionLogDto,
    @Req() request: any,
  ): Promise<NutritionLog> {
    const userId = request.userId; // Get userId from the request object
    return this.nutritionLogService.create(userId, createNutritionLogDto);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all nutrition logs for the user' })
  @ApiResponse({
    status: 200,
    description: 'A list of nutrition logs.',
    type: [NutritionLog],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll(@Req() request: any): Promise<NutritionLog[]> {
    const userId = request.userId; // Get userId from the request object
    return this.nutritionLogService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific nutrition log' })
  @ApiResponse({
    status: 200,
    description: 'The nutrition log.',
    type: NutritionLog,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findOne(
    @Param('id') log_id: string,
    @Req() request: any,
  ): Promise<NutritionLog> {
    const userId = request.userId; // Get userId from the request object
    return this.nutritionLogService.findOne(userId, log_id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a nutrition log',
    description: 'Update a nutrition log. All fields are optional.',
  })
  @ApiResponse({
    status: 200,
    description: 'The nutrition log has been successfully updated.',
    type: NutritionLog,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Param('id') log_id: string,
    @Body() updateNutritionLogDto: UpdateNutritionLogDto,
    @Req() request: any,
  ): Promise<NutritionLog> {
    const userId = request.userId; // Get userId from the request object
    return this.nutritionLogService.update(
      userId,
      log_id,
      updateNutritionLogDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a nutrition log' })
  @ApiResponse({
    status: 200,
    description: 'The nutrition log has been successfully deleted.',
    type: NutritionLog,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async delete(
    @Param('id') log_id: string,
    @Req() request: any,
  ): Promise<NutritionLog> {
    const userId = request.userId; // Get userId from the request object
    return this.nutritionLogService.delete(userId, log_id);
  }
}
