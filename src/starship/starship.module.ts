import { Module } from '@nestjs/common';
import { StarshipService } from './starship.service';
import { StarshipController } from './starship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starship } from './entities/starship.entity';
import { Film } from '../film/entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { Planet } from '../planet/entities/planet.entity';
import { Species } from '../species/entities/species.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, Film, Starship, Species, Planet, Vehicle])],
  controllers: [StarshipController],
  providers: [StarshipService],
})
export class StarshipModule {}
