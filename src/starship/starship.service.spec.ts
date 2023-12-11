import { Test, TestingModule } from '@nestjs/testing';
import { SpaceshipService } from './starship.service';

describe('SpaceshipService', () => {
  let service: SpaceshipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpaceshipService],
    }).compile();

    service = module.get<SpaceshipService>(SpaceshipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
