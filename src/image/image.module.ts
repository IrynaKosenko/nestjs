import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../film/entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { Planet } from '../planet/entities/planet.entity';
import { Species } from '../species/entities/species.entity';
import { Starship } from '../starship/entities/starship.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { Image } from '../image/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image, Person, Film, Starship, Species, Planet, Vehicle])],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
