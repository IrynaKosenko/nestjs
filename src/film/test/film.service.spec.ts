import { Test } from '@nestjs/testing';
import { Film } from '../entities/film.entity';
import { FilmService } from '../film.service';
import { Repository } from 'typeorm';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { EntityNotFoundException } from '../../exceptions/NotFound.exception';
import { dataSourceOptions } from '../../../database/data-source';
import {
  createdFilmStub,
  filmStub,
  filmStubCreateDto,
  filmStubUpdateDto,
  updatedFilmStub,
} from './film.stub';
import { mockFilmRepository, mockFilmService } from './film.mock.service';

describe('FilmService', () => {
  let filmModule;
  let filmService: FilmService;
  let filmRepository: Repository<Film>;

  beforeEach(async () => {
    filmModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(dataSourceOptions)],
      providers: [
        {
          provide: FilmService,
          useValue: mockFilmService,
        },
        {
          provide: getRepositoryToken(Film),
          useValue: mockFilmRepository,
        },
      ],
    }).compile();

    filmService = filmModule.get<FilmService>(FilmService);
    filmRepository = filmModule.get<Repository<Film>>(getRepositoryToken(Film));
  });

  jest.clearAllMocks();

  it('filmRepository should be defined', () => {
    expect(filmRepository).toBeDefined();
  });
  it('filmService should be defined', () => {
    expect(filmService).toBeDefined();
  });

  describe('CREATE', () => {
    let film: Film;

    beforeEach(async () => {
      film = await filmService.create(filmStubCreateDto());
    });

    it('should call filmService create method with expected params', async () => {
      expect(filmService.create).toHaveBeenCalledWith(filmStubCreateDto());
    });

    it('should call filmRepository.create with expected params', async () => {
      const createRepoSpy = jest.spyOn(filmRepository, 'create');
      filmRepository.create(createdFilmStub());
      expect(createRepoSpy).toHaveBeenCalledWith(createdFilmStub());
    });

    it('should return a film entity when created', async () => {
      expect(film).toEqual(createdFilmStub());
    });

    it('should call filmRepository.save with expected params', async () => {
      const saveRepoSpy = jest.spyOn(filmRepository, 'save');
      await filmRepository.save(film);
      expect(saveRepoSpy).toHaveBeenCalledWith(film);
    });
  });

  describe('FIND', () => {
    let film: Film;

    beforeEach(async () => {
      film = await filmService.findOne(filmStub().id);
    });

    it('should call findOne method with expected params', async () => {
      expect(filmService.findOne).toHaveBeenCalledWith(filmStub().id);
    });

    it('should call filmRepository.findOne with expected params', async () => {
      const findOptions = { relations: {}, where: { id: filmStub().id } };
      const findOneRepoSpy = jest.spyOn(filmRepository, 'findOne');
      await filmRepository.findOne(findOptions);
      expect(findOneRepoSpy).toHaveBeenCalledWith(findOptions);
    });

    it('should return film with expected params', async () => {
      expect(film).toEqual(filmStub());
      expect(typeof film).toBe('object');
    });

    it('should call findAll method with expected params and paginate', async () => {
      const paginateOptions = { page: 1, limit: 2 };
      await filmService.paginate(paginateOptions);
      expect(filmService.paginate).toHaveBeenCalledWith(paginateOptions);
    });

    it('should return an error when film doesn`t find', async () => {
      jest.spyOn(filmService, 'findOne').mockRejectedValue(new EntityNotFoundException('Film'));
      try {
        await filmService.findOne(100000);
      } catch (error) {
        expect(error).toBeInstanceOf(EntityNotFoundException);
      }
    });
  });

  describe('UPDATE', () => {
    let updatedFilm: Film;
    const updatedFilmDto = filmStubUpdateDto();

    beforeEach(async () => {
      updatedFilm = await filmService.update(1, filmStubUpdateDto());
    });

    it('should call filmService.update method with expected params', async () => {
      expect(filmService.update).toHaveBeenCalledWith(filmStub().id, updatedFilmDto);
    });

    it('should call filmRepository.save with expected params', async () => {
      const saveRepoSpy = jest.spyOn(filmRepository, 'save');
      await filmRepository.save(updatedFilmStub());
      expect(saveRepoSpy).toHaveBeenCalledWith(updatedFilmStub());
    });

    it('should return a film entity when updated', async () => {
      expect(updatedFilm).toEqual(updatedFilmStub());
    });

    it('should return an error when film doesn`t find', async () => {
      const wrongId = 555555;
      try {
        await filmService.update(wrongId, updatedFilmDto);
      } catch (error) {
        expect(error).toBeInstanceOf(EntityNotFoundException);
      }
    });
  });

  describe('DELETE', () => {
    it('should call filmService.delete method with expected param', async () => {
      await filmService.remove(filmStub().id);
      expect(filmService.remove).toHaveBeenCalledWith(filmStub().id);
    });

    it('deleted film should equals to passed film', async () => {
      const deletedFilm = await filmService.remove(filmStub().id);
      expect(deletedFilm).toEqual(filmStub());
    });

    it('should call filmRepository.remove with expected params', async () => {
      const removeRepoSpy = jest.spyOn(filmRepository, 'remove');
      await filmRepository.remove(filmStub());
      expect(removeRepoSpy).toHaveBeenCalledWith(filmStub());
    });

    it('should return an error when film doesn`t find', async () => {
      const wrongId = 555555;
      try {
        await filmService.remove(wrongId);
      } catch (error) {
        expect(error).toBeInstanceOf(EntityNotFoundException);
      }
    });
  });
});
