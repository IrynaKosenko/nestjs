import { Module } from '@nestjs/common';
import { MigrationService } from './migration.service';
import { MigrationController } from './migration.controller';
import { Film } from 'src/film/entities/film.entity';
import { Person } from 'src/people/entities/person.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Species } from 'src/species/entities/species.entity';
import { Planet } from 'src/planet/entities/planet.entity';
import { Starship } from 'src/starship/entities/starship.entity';
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
  controllers: [MigrationController],
  providers: [MigrationService],
})
export class MigrationModule {}
