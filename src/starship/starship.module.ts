import { Module } from '@nestjs/common';
import { StarshipService } from './starship.service';
import { StarshipController } from './starship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starship } from './entities/starship.entity';
import { Film } from 'src/film/entities/film.entity';
import { Person } from 'src/people/entities/person.entity';
import { Planet } from 'src/planet/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Person,
      Film,
      Starship,
      Species,
      Planet,
      Vehicle,
    ]),
  ],
  controllers: [StarshipController],
  providers: [StarshipService],
})
export class StarshipModule {}
