import { Test, TestingModule } from '@nestjs/testing';
import { StarshipController } from './starship.controller';
import { StarshipService } from './starship.service';

describe('SpaceshipController', () => {
  let controller: StarshipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarshipController],
      providers: [
        {
          provide: StarshipService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<StarshipController>(StarshipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
