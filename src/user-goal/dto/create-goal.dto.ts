import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum GoalType {
  BULKING = 'bulking',
  CUTTING = 'cutting',
  MAINTENANCE = 'maintenance',
}

export class CreateGoalDto {
  @ApiProperty({
    description: 'The type of goal',
    example: 'Weight Loss',
  })
  @IsString()
  @IsEnum(GoalType, {
    message: 'goal_type must be one of: bulking, cutting, maintenance',
  })
  goal_type: string;

  @ApiProperty({
    description: 'The target date to achieve the goal',
    example: '2024-12-31',
  })
  @IsDate()
  @Type(() => Date)
  end_date: Date;

  @ApiProperty({
    description: 'Optional notes for the goal',
    example: 'Lose 10kgs by the end of the year',
    required: false,
  })
  @IsString()
  notes?: string;
}
