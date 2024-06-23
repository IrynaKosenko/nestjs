import { Test, TestingModule } from '@nestjs/testing';
import { FilmController } from '../film.controller';
import { FilmService } from '../film.service';
import { CreateFilmDto } from '../dto/create-film.dto';
import { Film } from '../entities/film.entity';
import { mockFilmService } from './film.mock.service';
import { filmStub, filmStubCreateDto, filmStubUpdateDto } from './film.stub';
import { UpdateFilmDto } from '../dto/update-film.dto';

// jest.mock('../films.service.ts');

describe('FilmController', () => {
  let filmController: FilmController;
  let filmService: FilmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmController],
      providers: [
        {
          provide: FilmService,
          useValue: mockFilmService,
        },
      ],
    }).compile();

    filmController = module.get<FilmController>(FilmController);
    filmService = module.get<FilmService>(FilmService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(filmController).toBeDefined();
  });

  describe('FIND', () => {
    let film: Film;

    beforeEach(async () => {
      film = await filmController.findOne(filmStub().id);
    });

    it('should call findOne() method filmService', () => {
      expect(filmService.findOne).toBeCalledWith(filmStub().id);
    });

    it('should return a film', async () => {
      expect(film).toEqual(filmStub());
    });

    it('should throw an error', async () => {
      filmController.findOne = jest.fn().mockRejectedValue(new Error());
      await expect(filmController.findOne(123456)).rejects.toThrowError(new Error());
    });
  });

  describe('CREATE', () => {
    let film: Film;
    const dto: CreateFilmDto = filmStubCreateDto();

    beforeEach(async () => {
      film = await filmController.create(dto);
    });

    it('should call create() method filmService', () => {
      expect(filmService.create).toBeCalledWith(dto);
    });

    it('calling create method with not null object', () => {
      expect(filmController.create(dto)).not.toEqual(null);
    });

    it('should return a new film', async () => {
      expect(film).toEqual(filmStub());
    });

    it('should throw an error', async () => {
      jest.spyOn(filmController, 'create').mockImplementationOnce(() => {
        throw new Error();
      });
    });
  });

  describe('UPDATE', () => {
    const dto: UpdateFilmDto = filmStubUpdateDto();

    it('should call update() method filmService', () => {
      expect(filmService.update).toBeCalledWith(filmStub().id, dto);
    });

    it('calling update method with not null object', () => {
      expect(filmController.update(filmStub().id, dto)).not.toEqual(null);
    });

    it('should throw an error', async () => {
      jest.spyOn(filmController, 'update').mockImplementationOnce(() => {
        throw new Error();
      });
    });
  });

  describe('REMOVE', () => {
    let film: Film;

    beforeEach(async () => {
      film = await filmController.remove(filmStub().id);
    });

    it('should call remove() method filmService', () => {
      expect(filmService.remove).toBeCalledWith(filmStub().id);
    });

    it('calling remove method with not null object', () => {
      expect(filmController.remove(filmStub().id)).not.toEqual(null);
    });

    it('should return a removed film', async () => {
      expect(film).toEqual(filmStub());
    });

    it('should throw an error', async () => {
      jest.spyOn(filmController, 'remove').mockImplementationOnce(() => {
        throw new Error();
      });
    });
  });
});
