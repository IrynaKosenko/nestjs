import { Module } from '@nestjs/common';
import { PlanetService } from './planet.service';
import { PlanetController } from './planet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from './entities/planet.entity';
import { Film } from '../film/entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { Starship } from '../starship/entities/starship.entity';
import { Species } from '../species/entities/species.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, Film, Starship, Species, Planet, Vehicle])],
  controllers: [PlanetController],
  providers: [PlanetService],
})
export class PlanetModule {}
