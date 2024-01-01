import { Test, TestingModule } from '@nestjs/testing';
import { StarshipService } from './starship.service';

describe('StarshipService', () => {
  let service: StarshipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: StarshipService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<StarshipService>(StarshipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
