import { Injectable } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '../film/entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { In, Repository } from 'typeorm';
import { Planet } from './entities/planet.entity';
import { createUrlWithId, getMaxId } from '../common/common-functions';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { EntityNotFoundException } from '../exceptions/NotFound.exception';
import { entities } from '../common/constants';
import { Species } from '../species/entities/species.entity';

@Injectable()
export class PlanetService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Person)
    private readonly peopleRepository: Repository<Person>,
    @InjectRepository(Planet)
    private readonly planetRepository: Repository<Planet>,
    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,
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

    const person = await this.peopleRepository.find({
      where: {
        homeworld: { id: id },
      },
    });
    if (person) {
      person.map((personElement) => {
        this.peopleRepository.update(personElement.id, { homeworld: null });
      });
    }

    const species = await this.speciesRepository.findOne({
      where: {
        homeworld: { id: id },
      },
    });
    if (species) await this.speciesRepository.update(species.id, { homeworld: null });

    return this.planetRepository.remove(planet);
  }
}
