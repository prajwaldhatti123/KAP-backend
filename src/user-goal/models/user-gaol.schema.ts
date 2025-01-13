import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class UserGoal {
  @Prop({ required: true, ref: 'UserProfile' })
  user_id: string;

  @Prop({ required: true, enum: ['bulking', 'cutting', 'maintenance'] })
  goal_type: string;

  @Prop({ required: true, default: Date.now })
  start_date: Date;

  @Prop({ required: true })
  end_date: Date;

  @Prop({ required: false })
  notes?: string;
}

export const UserGoalSchema = SchemaFactory.createForClass(UserGoal);
