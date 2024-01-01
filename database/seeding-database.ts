import { Film } from 'src/film/entities/film.entity';
import { Person } from 'src/people/entities/person.entity';
import { Planet } from 'src/planet/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starship } from 'src/starship/entities/starship.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { QueryRunner } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { entitiesForSeeding, nameJoinedTables } from 'src/common/constants';

export class SeedingDatabase {
  constructor(
    @InjectDataSource()
    public queryRunner: QueryRunner,
  ) {}

  getDataAndFillTables = async () => {
    for (let entity in entitiesForSeeding) {
      let url = `https://swapi.dev/api/${entity}`;

      while (url !== null) {
        const resultsObject = await fetch(url)
          .then((response) => response.json())
          .then((res) => {
            return res;
          });

        const { results, next } = resultsObject;

        await this.saveToDBWithoutRelations(results, entity);

        if (entity === 'films' || entity === 'people') {
          await this.setRelations(results, entity);
        }
        url = next;
      }
    }
  };

  async saveToDBWithoutRelations(dataArray: [], entity: string) {
    const peopleRepository = this.queryRunner.manager.getRepository(Person);
    const planetRepository = this.queryRunner.manager.getRepository(Planet);
    const filmRepository = this.queryRunner.manager.getRepository(Film);
    const speciesRepository = this.queryRunner.manager.getRepository(Species);
    const vehicleRepository = this.queryRunner.manager.getRepository(Vehicle);
    const starshipRepository = this.queryRunner.manager.getRepository(Starship);

    dataArray.forEach((data: any) => {
      data.id = this.getIdFromUrl(data.url);

      if (entity === 'people') {
        data.homeworld = this.getIdFromUrl(data.homeworld);
      }

      if (entity === 'species') {
        if (data.homeworld === null || data.homeworld === undefined) {
          data.homeworld = null;
        } else {
          data.homeworld = this.getIdFromUrl(data.homeworld);
        }
      }
    });
    switch (entity) {
      case 'people':
        return await peopleRepository.save(dataArray);
      case 'planets':
        return await planetRepository.save(dataArray);
      case 'films':
        return await filmRepository.save(dataArray);
      case 'species':
        return await speciesRepository.save(dataArray);
      case 'vehicles':
        return await vehicleRepository.save(dataArray);
      case 'starships':
        return await starshipRepository.save(dataArray);
    }
  }

  async setRelations(dataArray: [], entity: string) {
    if (entity === 'people') {
      dataArray.forEach(async (person: any) => {
        person.id = this.getIdFromUrl(person.url);

        let filmsIds = this.getAllIdsFromEntity(person.films);
        let speciesIds = this.getAllIdsFromEntity(person.species);
        let vehiclesIds = this.getAllIdsFromEntity(person.vehicles);
        let starshipsIds = this.getAllIdsFromEntity(person.starships);

        Promise.all([
          this.insertRelationsToDatabase(filmsIds, person.id, entity, nameJoinedTables.person_film),
          this.insertRelationsToDatabase(
            speciesIds,
            person.id,
            entity,
            nameJoinedTables.person_species,
          ),
          this.insertRelationsToDatabase(
            vehiclesIds,
            person.id,
            entity,
            nameJoinedTables.person_vehicle,
          ),
          this.insertRelationsToDatabase(
            starshipsIds,
            person.id,
            entity,
            nameJoinedTables.person_starship,
          ),
        ]);
      });
    } else if (entity === 'films') {
      dataArray.forEach(async (film: any) => {
        film.id = this.getIdFromUrl(film.url);

        let planetsIds = this.getAllIdsFromEntity(film.planets);
        let speciesIds = this.getAllIdsFromEntity(film.species);
        let vehiclesIds = this.getAllIdsFromEntity(film.vehicles);
        let starshipsIds = this.getAllIdsFromEntity(film.starships);

        Promise.all([
          this.insertRelationsToDatabase(planetsIds, film.id, entity, nameJoinedTables.film_planet),
          this.insertRelationsToDatabase(
            speciesIds,
            film.id,
            entity,
            nameJoinedTables.film_species,
          ),
          this.insertRelationsToDatabase(
            starshipsIds,
            film.id,
            entity,
            nameJoinedTables.film_starship,
          ),
          this.insertRelationsToDatabase(
            vehiclesIds,
            film.id,
            entity,
            nameJoinedTables.film_vehicle,
          ),
        ]);
      });
    }
  }

  async insertRelationsToDatabase(
    arrayEntityIds: number[],
    entityId: number,
    entity: string,
    nameTable: string,
  ) {
    const secondValue = nameTable.includes('species')
      ? nameTable.split('_')[1]
      : nameTable.split('_')[1] + 's';
    arrayEntityIds.forEach(async (id: number) => {
      await this.queryRunner.query(
        `INSERT INTO ${nameTable} (${entity}Id, ${secondValue}Id) VALUES (?, ?)`,
        [entityId, id],
      );
    });
  }

  getAllIdsFromEntity(entitiesUrl: string[]): number[] {
    if (entitiesUrl === null || entitiesUrl === undefined) return [];
    return entitiesUrl.map((elem: string) => this.getIdFromUrl(elem));
  }

  getIdFromUrl(url: string): number {
    if (url === null || url === undefined) return 0;
    return Number(url.match(/\d+/gm)?.join());
  }

  async clearTables() {
    // to temporarily disable all the foreign keys:
    await this.queryRunner.query('SET FOREIGN_KEY_CHECKS=0;');

    await this.queryRunner.query('TRUNCATE TABLE film_starship');
    await this.queryRunner.query('TRUNCATE TABLE person_starship');
    await this.queryRunner.query('TRUNCATE TABLE film_species');
    await this.queryRunner.query('TRUNCATE TABLE film_planet');
    await this.queryRunner.query('TRUNCATE TABLE film_vehicle');
    await this.queryRunner.query('TRUNCATE TABLE person_film');
    await this.queryRunner.query('TRUNCATE TABLE person_species');
    await this.queryRunner.query('TRUNCATE TABLE person_vehicle');
    await this.queryRunner.query('TRUNCATE TABLE planets');
    await this.queryRunner.query('TRUNCATE TABLE species');
    await this.queryRunner.query('TRUNCATE TABLE starships');
    await this.queryRunner.query('TRUNCATE TABLE users');
    await this.queryRunner.query('TRUNCATE TABLE vehicles');
    await this.queryRunner.query('TRUNCATE TABLE films');
    await this.queryRunner.query('TRUNCATE TABLE people');
    await this.queryRunner.query('TRUNCATE TABLE images');
  }
}
