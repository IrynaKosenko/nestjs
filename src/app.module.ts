import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleModule } from './people/people.module';
import { FilmModule } from './film/film.module';
import { MigrationModule } from './migration/migration.module';
import { PlanetModule } from './planet/planet.module';
import { StarshipModule } from './starship/starship.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { SpeciesModule } from './species/species.module';
import { dataSourceOptions } from '../database/data-source';
import { ImageModule } from './image/image.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import JwtAuthGuard from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    PeopleModule,
    FilmModule,
    MigrationModule,
    PlanetModule,
    StarshipModule,
    VehicleModule,
    SpeciesModule,
    MigrationModule,
    ImageModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
