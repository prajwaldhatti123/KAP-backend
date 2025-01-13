import { IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateGoalDto {
  @IsString()
  goal_type: string;

  @IsDate()
  @Type(() => Date)
  end_date: Date;

  @IsString()
  notes?: string;
}
