import { createdFilmStub, filmStub, updatedFilmStub } from './film.stub';

export const mockFilmService = {
  create: jest.fn().mockResolvedValue(createdFilmStub()),
  findOne: jest.fn().mockResolvedValue(filmStub()),
  update: jest.fn().mockResolvedValue(updatedFilmStub()),
  remove: jest.fn().mockResolvedValue(filmStub()),
  paginate: jest.fn().mockResolvedValue(filmStub()),
};

export const mockFilmRepository = {
  create: jest.fn().mockResolvedValue(createdFilmStub()),
  findOne: jest.fn().mockResolvedValue(filmStub()),
  update: jest.fn().mockResolvedValue(updatedFilmStub()),
  remove: jest.fn().mockResolvedValue(filmStub()),
  save: jest.fn().mockResolvedValue(filmStub()),
};
