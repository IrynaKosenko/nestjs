import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { createUrlWithId, getMaxId } from 'src/common/common-functions';
import { Film } from 'src/film/entities/film.entity';
import { Person } from 'src/people/entities/person.entity';
import { Repository, In } from 'typeorm';
import { Starship } from './entities/starship.entity';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { EntityNotFoundException } from 'src/exceptions/NotFound.exception';
import { entities } from 'src/common/constants';

@Injectable()
export class StarshipService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Person)
    private readonly peopleRepository: Repository<Person>,
    @InjectRepository(Starship)
    private readonly starshipRepository: Repository<Starship>,
  ) {}
  async create(createSpaceshipDto: CreateStarshipDto) {
    const maxStarshipId = (await getMaxId(entities.starships, this.starshipRepository)) + 1;

    const pilots = await this.peopleRepository.find({
      where: {
        id: In(createSpaceshipDto.pilots),
      },
    });
    const films = await this.filmRepository.find({
      where: {
        id: In(createSpaceshipDto.films),
      },
    });

    const newStarship = this.starshipRepository.create({
      id: maxStarshipId,
      name: createSpaceshipDto.name,
      model: createSpaceshipDto.model,
      manufacturer: createSpaceshipDto.manufacturer,
      cost_in_credits: createSpaceshipDto.cost_in_credits,
      length: createSpaceshipDto.length,
      max_atmosphering_speed: createSpaceshipDto.max_atmosphering_speed,
      crew: createSpaceshipDto.crew,
      passengers: createSpaceshipDto.passengers,
      cargo_capacity: createSpaceshipDto.cargo_capacity,
      consumables: createSpaceshipDto.consumables,
      hyperdrive_rating: createSpaceshipDto.hyperdrive_rating,
      MGLT: createSpaceshipDto.MGLT,
      starship_class: createSpaceshipDto.starship_class,
      pilots,
      films,
      url: createUrlWithId(maxStarshipId, entities.starships),
    });
    return await this.starshipRepository.save(newStarship);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Starship>> {
    return paginate<Starship>(this.starshipRepository, options);
  }

  async findOne(id: number) {
    const starship = await this.starshipRepository.findOne({
      relations: {
        films: true,
        pilots: true,
        images: true,
      },
      where: { id: id },
    });
    if (!starship) throw new EntityNotFoundException('Starship');
    return starship;
  }

  async update(id: number, updateSpaceshipDto: UpdateStarshipDto) {
    const starship = await this.findOne(id);
    if (!starship) throw new EntityNotFoundException('Starship');
    const { films, pilots, ...dataStarship } = updateSpaceshipDto;

    Object.assign(starship, dataStarship);

    if (updateSpaceshipDto.films) {
      starship.films = await this.filmRepository.find({
        where: {
          id: In(updateSpaceshipDto.films),
        },
      });
    }
    if (updateSpaceshipDto.pilots) {
      starship.pilots = await this.peopleRepository.find({
        where: {
          id: In(updateSpaceshipDto.pilots),
        },
      });
    }
    starship.edited = new Date();
    return await this.starshipRepository.save(starship);
  }

  async remove(id: number) {
    const starship = await this.findOne(id);
    if (!starship) throw new EntityNotFoundException('Starship');
    return this.starshipRepository.remove(starship);
  }
}
