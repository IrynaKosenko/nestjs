import { CreateFilmDto } from 'src/film/dto/create-film.dto';
import { Film } from 'src/film/entities/film.entity';
import { UpdateFilmDto } from '../dto/update-film.dto';

export const filmStub = (): Film => {
  return {
    id: 1,
    title: 'Example',
    episode_id: 'Example',
    opening_crawl: 'Example',
    director: 'Example',
    producer: 'Example',
    release_date: 'Example',
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    images: [],
    created: new Date('2024'),
    edited: new Date('2024'),
    url: 'example',
  };
};
export const filmStubCreateDto = (): CreateFilmDto => {
  return {
    title: 'Example',
    episode_id: 'Example',
    opening_crawl: 'Example',
    director: 'Example',
    producer: 'Example',
    release_date: 'Example',
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
  };
};
export const createdFilmStub = (): Film => {
  return {
    id: 1,
    title: 'Example',
    episode_id: 'Example',
    opening_crawl: 'Example',
    director: 'Example',
    producer: 'Example',
    release_date: 'Example',
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    images: [],
    created: new Date('2024'),
    edited: new Date('2024'),
    url: 'example',
  };
};

export const filmStubUpdateDto = (): UpdateFilmDto => {
  return {
    title: 'Example Updated Title',
  };
};

export const updatedFilmStub = (): Film => {
  return {
    id: 1,
    title: 'Example Updated Title',
    episode_id: 'Example',
    opening_crawl: 'Example',
    director: 'Example',
    producer: 'Example',
    release_date: 'Example',
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    images: [],
    created: new Date('2023'),
    edited: new Date('2023'),
    url: 'example',
  };
};
