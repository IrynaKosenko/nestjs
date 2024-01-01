import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
import { Person } from './entities/person.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../film/entities/film.entity';
import { Planet } from '../planet/entities/planet.entity';
import { Starship } from '../starship/entities/starship.entity';
import { Species } from '../species/entities/species.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { Image } from '../image/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image, Person, Film, Starship, Species, Planet, Vehicle])],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PeopleModule {}
