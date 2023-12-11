import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';
import { createUrlWithId, getMaxId } from 'src/common/common-functions';
import { Planet } from 'src/planet/entities/planet.entity';
import { Film } from 'src/film/entities/film.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starship } from 'src/starship/entities/starship.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { S3Client } from '@aws-sdk/client-s3';
import { EntityNotFoundException } from 'src/exceptions/NotFound.exception';
import { CreatedObjectException } from 'src/exceptions/CreatedObject.exception';
import { entities } from 'src/common/constants';

@Injectable()
export class PeopleService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
    },
  });
  constructor(
    private readonly configService: ConfigService,
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

  async create(createPersonDto: CreatePersonDto) {
    const maxPersonId = (await getMaxId(entities.people, this.peopleRepository)) + 1;

    const homeworld = await this.planetRepository.findOne({
      where: { id: createPersonDto.homeworld },
    });
    const films = await this.filmRepository.find({
      where: {
        id: In(createPersonDto.films),
      },
    });
    const species = await this.speciesRepository.find({
      where: {
        id: In(createPersonDto.species),
      },
    });
    const vehicles = await this.vehicleRepository.find({
      where: {
        id: In(createPersonDto.vehicles),
      },
    });
    const starships = await this.starshipRepository.find({
      where: {
        id: In(createPersonDto.starships),
      },
    });

    const newPerson = this.peopleRepository.create({
      id: maxPersonId,
      name: createPersonDto.name,
      height: createPersonDto.height,
      mass: createPersonDto.mass,
      hair_color: createPersonDto.hair_color,
      skin_color: createPersonDto.skin_color,
      eye_color: createPersonDto.eye_color,
      birth_year: createPersonDto.birth_year,
      gender: createPersonDto.gender,
      homeworld,
      films,
      species,
      vehicles,
      starships,
      url: createUrlWithId(maxPersonId, entities.people),
    });
    //if (!newPerson) throw new CreatedObjectException();
    return await this.peopleRepository.save(newPerson);
  }

  async getAllPaginate(options: IPaginationOptions): Promise<Pagination<Person>> {
    return paginate<Person>(this.peopleRepository, options);
  }

  async findOne(id: number) {
    const person = await this.peopleRepository.findOne({
      relations: {
        homeworld: true,
        films: true,
        species: true,
        vehicles: true,
        starships: true,
        images: true,
      },
      where: { id: id },
    });
    if (!person) throw new EntityNotFoundException('Person');
    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const person = await this.findOne(id);
    if (!person) throw new EntityNotFoundException('Person');
    const { films, species, vehicles, starships, ...dataPerson } = updatePersonDto;

    Object.assign(person, dataPerson);

    if (updatePersonDto.films) {
      person.films = await this.filmRepository.find({
        where: {
          id: In(updatePersonDto.films),
        },
      });
    }
    if (updatePersonDto.species) {
      person.species = await this.speciesRepository.find({
        where: {
          id: In(updatePersonDto.species),
        },
      });
    }
    if (updatePersonDto.vehicles) {
      person.vehicles = await this.vehicleRepository.find({
        where: {
          id: In(updatePersonDto.vehicles),
        },
      });
    }
    if (updatePersonDto.starships) {
      person.starships = await this.starshipRepository.find({
        where: {
          id: In(updatePersonDto.starships),
        },
      });
    }
    person.edited = new Date();
    return await this.peopleRepository.save(person);
  }

  async remove(id: number) {
    const person = await this.findOne(id);
    if (!person) throw new EntityNotFoundException('Person');
    return this.peopleRepository.remove(person);
  }
}
