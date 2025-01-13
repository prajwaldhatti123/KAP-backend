import { Controller } from '@nestjs/common';
import { UserRoutinesService } from './user-routines.service';

@Controller('user-routines')
export class UserRoutinesController {
  constructor(private readonly userRoutinesService: UserRoutinesService) {}
}
