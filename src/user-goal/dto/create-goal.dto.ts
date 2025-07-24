import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGoalDto {
  @ApiProperty({
    description: 'The type of goal',
    example: 'Weight Loss',
  })
  @IsString()
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
