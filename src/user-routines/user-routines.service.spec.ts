import { Test, TestingModule } from '@nestjs/testing';
import { UserRoutinesService } from './user-routines.service';

describe('UserRoutinesService', () => {
  let service: UserRoutinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRoutinesService],
    }).compile();

    service = module.get<UserRoutinesService>(UserRoutinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
