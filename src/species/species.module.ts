import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Species } from './entities/species.entity';
import { Film } from '../film/entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { Planet } from '../planet/entities/planet.entity';
import { Starship } from '../starship/entities/starship.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, Film, Starship, Species, Planet, Vehicle])],
  controllers: [SpeciesController],
  providers: [SpeciesService],
})
export class SpeciesModule {}
