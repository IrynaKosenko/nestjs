import { Controller, Get } from '@nestjs/common';
import { MigrationService } from './migration.service';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/film/entities/film.entity';
import { Person } from 'src/people/entities/person.entity';
import { Repository } from 'typeorm';

@Controller('migrations')
@ApiTags('migrations')
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) {}

  @Get()
  migrationsAllEntities() {
    this.migrationService.fetchAndFillTables();
  }
}
