import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Film } from '../film/entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { Planet } from '../planet/entities/planet.entity';
import { Starship } from '../starship/entities/starship.entity';
import { Species } from '../species/entities/species.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, Film, Starship, Species, Planet, Vehicle])],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
