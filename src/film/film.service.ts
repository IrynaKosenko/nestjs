import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/people/entities/person.entity';
import { Planet } from 'src/planet/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starship } from 'src/starship/entities/starship.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { In, Repository } from 'typeorm';
import { Film } from './entities/film.entity';
import { createUrlWithId, getMaxId } from 'src/common/common-functions';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { EntityNotFoundException } from 'src/exceptions/NotFound.exception';
import { entities } from 'src/common/constants';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Person)
    private readonly peopleRepository: Repository<Person>,
    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,
    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Starship)
    private readonly starshipRepository: Repository<Starship>,
  ) {}

  async create(createFilmDto: CreateFilmDto) {
    const maxFilmId = (await getMaxId(entities.films, this.filmRepository)) + 1;

    const characters = await this.filmRepository.find({
      where: { id: In(createFilmDto.characters) },
    });
    const planets = await this.planetRepository.find({
      where: {
        id: In(createFilmDto.planets),
      },
    });
    const species = await this.speciesRepository.find({
      where: {
        id: In(createFilmDto.species),
      },
    });
    const vehicles = await this.vehicleRepository.find({
      where: {
        id: In(createFilmDto.vehicles),
      },
    });
    const starships = await this.starshipRepository.find({
      where: {
        id: In(createFilmDto.starships),
      },
    });

    const newFilm = this.filmRepository.create({
      id: maxFilmId,
      title: createFilmDto.title,
      episode_id: createFilmDto.episode_id,
      opening_crawl: createFilmDto.opening_crawl,
      director: createFilmDto.director,
      producer: createFilmDto.producer,
      release_date: createFilmDto.release_date,
      characters,
      species,
      vehicles,
      planets,
      starships,
      url: createUrlWithId(maxFilmId, entities.films),
    });
    return await this.filmRepository.save(newFilm);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Film>> {
    return paginate<Film>(this.filmRepository, options);
  }

  async findOne(id: number) {
    const film = await this.filmRepository.findOne({
      relations: {
        characters: true,
        planets: true,
        starships: true,
        vehicles: true,
        species: true,
        images: true,
      },
      where: { id: id },
    });
    if (!film) throw new EntityNotFoundException('Film');
    return film;
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    const film = await this.findOne(id);
    if (!film) throw new EntityNotFoundException('Film');
    const { characters, planets, species, vehicles, starships, ...dataFilm } = updateFilmDto;

    Object.assign(film, dataFilm);

    if (updateFilmDto.characters) {
      film.characters = await this.peopleRepository.find({
        where: {
          id: In(updateFilmDto.characters),
        },
      });
    }
    if (updateFilmDto.planets) {
      film.planets = await this.planetRepository.find({
        where: {
          id: In(updateFilmDto.planets),
        },
      });
    }
    if (updateFilmDto.species) {
      film.species = await this.speciesRepository.find({
        where: {
          id: In(updateFilmDto.species),
        },
      });
    }
    if (updateFilmDto.vehicles) {
      film.vehicles = await this.vehicleRepository.find({
        where: {
          id: In(updateFilmDto.vehicles),
        },
      });
    }
    if (updateFilmDto.starships) {
      film.starships = await this.starshipRepository.find({
        where: {
          id: In(updateFilmDto.starships),
        },
      });
    }
    film.edited = new Date();
    return await this.filmRepository.save(film);
  }

  async remove(id: number) {
    const film = await this.findOne(id);
    if (!film) throw new EntityNotFoundException('Film');
    return this.filmRepository.remove(film);
  }
}
