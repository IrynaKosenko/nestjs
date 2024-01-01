import { Controller, Get } from '@nestjs/common';
import { MigrationService } from './migration.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@Public()
@Controller('migrations')
@ApiTags('migrations')
export class MigrationController {
  constructor(private readonly migrationService: MigrationService) {}

  @Get()
  migrationsAllEntities() {
    this.migrationService.fetchAndFillTables();
  }
}
