import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { Person } from './entities/person.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from 'src/film/entities/film.entity';
import { Planet } from 'src/planet/entities/planet.entity';
import { Starship } from 'src/starship/entities/starship.entity';
import { Species } from 'src/species/entities/species.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Image } from 'src/image/entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Image,
      Person,
      Film,
      Starship,
      Species,
      Planet,
      Vehicle,
    ]),
  ],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PeopleModule {}
