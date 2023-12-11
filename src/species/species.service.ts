import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/film/entities/film.entity';
import { Person } from 'src/people/entities/person.entity';
import { Planet } from 'src/planet/entities/planet.entity';
import { In, Repository } from 'typeorm';
import { Species } from './entities/species.entity';
import { createUrlWithId, getMaxId } from 'src/common/common-functions';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { EntityNotFoundException } from 'src/exceptions/NotFound.exception';
import { entities } from 'src/common/constants';

@Injectable()
export class SpeciesService {
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
  async create(createSpeciesDto: CreateSpeciesDto) {
    const maxSpeciesId = (await getMaxId(entities.species, this.speciesRepository)) + 1;

    const homeworld = await this.planetRepository.findOne({
      where: { id: createSpeciesDto.homeworld },
    });
    const people = await this.peopleRepository.find({
      where: {
        id: In(createSpeciesDto.people),
      },
    });
    const films = await this.filmRepository.find({
      where: {
        id: In(createSpeciesDto.films),
      },
    });

    const newSpecies = this.speciesRepository.create({
      id: maxSpeciesId,
      name: createSpeciesDto.name,
      classification: createSpeciesDto.classification,
      designation: createSpeciesDto.designation,
      average_height: createSpeciesDto.average_height,
      hair_colors: createSpeciesDto.hair_colors,
      skin_colors: createSpeciesDto.skin_colors,
      eye_colors: createSpeciesDto.eye_colors,
      average_lifespan: createSpeciesDto.average_lifespan,
      homeworld,
      language: createSpeciesDto.language,
      films,
      people,
      url: createUrlWithId(maxSpeciesId, entities.species),
    });
    return await this.speciesRepository.save(newSpecies);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Species>> {
    return paginate<Species>(this.speciesRepository, options);
  }

  async findOne(id: number) {
    const species = await this.speciesRepository.findOne({
      relations: {
        homeworld: true,
        films: true,
        people: true,
        images: true,
      },
      where: { id: id },
    });
    if (!species) throw new EntityNotFoundException('Species');
    return species;
  }

  async update(id: number, updateSpeciesDto: UpdateSpeciesDto) {
    const species = await this.findOne(id);
    if (!species) throw new EntityNotFoundException('Species');
    const { films, people, ...dataSpecies } = updateSpeciesDto;

    Object.assign(species, dataSpecies);

    if (updateSpeciesDto.films) {
      species.films = await this.filmRepository.find({
        where: {
          id: In(updateSpeciesDto.films),
        },
      });
    }
    if (updateSpeciesDto.people) {
      species.people = await this.peopleRepository.find({
        where: {
          id: In(updateSpeciesDto.people),
        },
      });
    }
    species.edited = new Date();
    return await this.speciesRepository.save(species);
  }

  async remove(id: number) {
    const species = await this.findOne(id);
    if (!species) throw new EntityNotFoundException('Species');
    return this.speciesRepository.remove(species);
  }
}
