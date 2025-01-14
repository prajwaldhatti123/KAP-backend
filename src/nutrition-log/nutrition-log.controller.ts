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
import { UpdateNutritionLogDto } from './dto/update-nutrition-log.dto copy';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('nutrition-logs')
@UseGuards(AuthGuard) // Use your custom AuthGuard
export class NutritionLogController {
  constructor(private readonly nutritionLogService: NutritionLogService) {}

  @Post('create')
  async create(
    @Body() createNutritionLogDto: CreateNutritionLogDto,
    @Req() request: any,
  ): Promise<NutritionLog> {
    const userId = request.userId; // Get userId from the request object
    return this.nutritionLogService.create(userId, createNutritionLogDto);
  }

  @Get('getAll')
  async findAll(@Req() request: any): Promise<NutritionLog[]> {
    const userId = request.userId; // Get userId from the request object
    return this.nutritionLogService.findAll(userId);
  }

  @Get(':id')
  async findOne(
    @Param('id') log_id: string,
    @Req() request: any,
  ): Promise<NutritionLog> {
    const userId = request.userId; // Get userId from the request object
    return this.nutritionLogService.findOne(userId, log_id);
  }

  @Put(':id')
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
  async delete(
    @Param('id') log_id: string,
    @Req() request: any,
  ): Promise<NutritionLog> {
    const userId = request.userId; // Get userId from the request object
    return this.nutritionLogService.delete(userId, log_id);
  }
}
