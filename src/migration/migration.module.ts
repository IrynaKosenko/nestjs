import { Module } from '@nestjs/common';
import { MigrationService } from './migration.service';
import { MigrationController } from './migration.controller';
import { Film } from '../film/entities/film.entity';
import { Person } from '../people/entities/person.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Species } from '../species/entities/species.entity';
import { Planet } from '../planet/entities/planet.entity';
import { Starship } from '../starship/entities/starship.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, Film, Starship, Species, Planet, Vehicle])],
  controllers: [MigrationController],
  providers: [MigrationService],
})
export class MigrationModule {}
