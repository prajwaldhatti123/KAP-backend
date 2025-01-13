import { Test, TestingModule } from '@nestjs/testing';
import { UserRoutinesController } from './user-routines.controller';
import { UserRoutinesService } from './user-routines.service';

describe('UserRoutinesController', () => {
  let controller: UserRoutinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRoutinesController],
      providers: [UserRoutinesService],
    }).compile();

    controller = module.get<UserRoutinesController>(UserRoutinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
