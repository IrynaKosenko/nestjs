import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/film/entities/film.entity';
import { Person } from 'src/people/entities/person.entity';
import { In, Repository } from 'typeorm';
import { Planet } from './entities/planet.entity';
import { createUrlWithId, getMaxId } from 'src/common/common-functions';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { EntityNotFoundException } from 'src/exceptions/NotFound.exception';
import { entities } from 'src/common/constants';

@Injectable()
export class PlanetService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Person)
    private readonly peopleRepository: Repository<Person>,
    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,
  ) {}

  async create(createPlanetDto: CreatePlanetDto) {
    const maxPlanetId = (await getMaxId(entities.planets, this.planetRepository)) + 1;

    const films = await this.filmRepository.find({
      where: {
        id: In(createPlanetDto.films),
      },
    });
    const residents = await this.peopleRepository.find({
      where: {
        id: In(createPlanetDto.residents),
      },
    });

    const newPlanet = this.planetRepository.create({
      id: maxPlanetId,
      name: createPlanetDto.name,
      rotation_period: createPlanetDto.rotation_period,
      orbital_period: createPlanetDto.orbital_period,
      diameter: createPlanetDto.diameter,
      climate: createPlanetDto.climate,
      gravity: createPlanetDto.gravity,
      terrain: createPlanetDto.terrain,
      surface_water: createPlanetDto.surface_water,
      population: createPlanetDto.population,
      residents,
      films,
      url: createUrlWithId(maxPlanetId, entities.planets),
    });
    return await this.planetRepository.save(newPlanet);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Planet>> {
    return paginate<Planet>(this.planetRepository, options);
  }

  async findOne(id: number) {
    const planet = await this.planetRepository.findOne({
      relations: {
        films: true,
        residents: true,
        images: true,
      },
      where: { id: id },
    });
    if (!planet) throw new EntityNotFoundException('Planet');
    return planet;
  }

  async update(id: number, updatePlanetDto: UpdatePlanetDto) {
    const planet = await this.findOne(id);
    if (!planet) throw new EntityNotFoundException('Planet');
    const { films, residents, ...dataPlanet } = updatePlanetDto;

    Object.assign(planet, dataPlanet);

    if (updatePlanetDto.films) {
      planet.films = await this.filmRepository.find({
        where: {
          id: In(updatePlanetDto.films),
        },
      });
    }
    if (updatePlanetDto.residents) {
      planet.residents = await this.peopleRepository.find({
        where: {
          id: In(updatePlanetDto.residents),
        },
      });
    }

    planet.edited = new Date();
    return await this.planetRepository.save(planet);
  }

  async remove(id: number) {
    const planet = await this.findOne(id);
    if (!planet) throw new EntityNotFoundException('Planet');
    const person = await this.peopleRepository.findOne({
      where: {
        homeworld: { id: id },
      },
    });
    if (person) await this.peopleRepository.update(person.id, { homeworld: null });
    return this.planetRepository.remove(planet);
  }
}
