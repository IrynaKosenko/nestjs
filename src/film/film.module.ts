import { Module } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmController } from './film.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/people/entities/person.entity';
import { Film } from './entities/film.entity';
import { Starship } from 'src/starship/entities/starship.entity';
import { Species } from 'src/species/entities/species.entity';
import { Planet } from 'src/planet/entities/planet.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Migration } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { LocalStrategy } from 'src/auth/strategies/local-strategy';
import { EmailExistsValidation } from 'src/common/custom-validation/email-exist.validation';
import { ValidEmailValidation } from 'src/common/custom-validation/email-valid.validation';
import { isPasswordMatchingValidation } from 'src/common/custom-validation/password-matcing';
import { UsersService } from 'src/users/users.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([Person, Film, Starship, Species, Planet, Vehicle])],
  controllers: [FilmController],
  providers: [FilmService],
})
export class FilmModule {}
