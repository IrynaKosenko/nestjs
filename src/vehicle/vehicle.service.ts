import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { createUrlWithId, getMaxId } from '../common/common-functions';
import { Film } from '../film/entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { Repository, In } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { EntityNotFoundException } from '../exceptions/NotFound.exception';
import { entities } from '../common/constants';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Person)
    private readonly peopleRepository: Repository<Person>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}
  async create(createVehicleDto: CreateVehicleDto) {
    const maxVehicleId = (await getMaxId(entities.vehicles, this.vehicleRepository)) + 1;

    const pilots = await this.peopleRepository.find({
      where: {
        id: In(createVehicleDto.pilots),
      },
    });
    const films = await this.filmRepository.find({
      where: {
        id: In(createVehicleDto.films),
      },
    });

    const newVehicle = this.vehicleRepository.create({
      id: maxVehicleId,
      name: createVehicleDto.name,
      model: createVehicleDto.model,
      manufacturer: createVehicleDto.manufacturer,
      cost_in_credits: createVehicleDto.cost_in_credits,
      length: createVehicleDto.length,
      max_atmosphering_speed: createVehicleDto.max_atmosphering_speed,
      crew: createVehicleDto.crew,
      passengers: createVehicleDto.passengers,
      cargo_capacity: createVehicleDto.cargo_capacity,
      consumables: createVehicleDto.consumables,
      vehicle_class: createVehicleDto.vehicle_class,
      films,
      pilots,
      url: createUrlWithId(maxVehicleId, entities.vehicles),
    });
    return await this.vehicleRepository.save(newVehicle);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Vehicle>> {
    return paginate<Vehicle>(this.vehicleRepository, options);
  }

  async findOne(id: number) {
    const vehicle = await this.vehicleRepository.findOne({
      relations: {
        films: true,
        pilots: true,
        images: true,
      },
      where: { id: id },
    });
    if (!vehicle) throw new EntityNotFoundException('Vehicle');
    return vehicle;
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    const vehicle = await this.findOne(id);
    if (!vehicle) throw new EntityNotFoundException('Vehicle');
    const { films, pilots, ...dataVehicle } = updateVehicleDto;

    Object.assign(vehicle, dataVehicle);

    if (updateVehicleDto.films) {
      vehicle.films = await this.filmRepository.find({
        where: {
          id: In(updateVehicleDto.films),
        },
      });
    }
    if (updateVehicleDto.pilots) {
      vehicle.pilots = await this.peopleRepository.find({
        where: {
          id: In(updateVehicleDto.pilots),
        },
      });
    }
    vehicle.edited = new Date();
    return await this.vehicleRepository.save(vehicle);
  }

  async remove(id: number) {
    const vehicle = await this.findOne(id);
    if (!vehicle) throw new EntityNotFoundException('Vehicle');
    return this.vehicleRepository.remove(vehicle);
  }
}
