import { Module } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmController } from './film.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../people/entities/person.entity';
import { Film } from './entities/film.entity';
import { Starship } from '../starship/entities/starship.entity';
import { Species } from '../species/entities/species.entity';
import { Planet } from '../planet/entities/planet.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, Film, Starship, Species, Planet, Vehicle])],
  controllers: [FilmController],
  providers: [FilmService],
})
export class FilmModule {}
