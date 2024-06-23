import { nameJoinedTables } from '../src/common/constants';
import { Film } from '../src/film/entities/film.entity';
import { Person } from '../src/people/entities/person.entity';
import { Planet } from '../src/planet/entities/planet.entity';
import { Species } from '../src/species/entities/species.entity';
import { Starship } from '../src/starship/entities/starship.entity';
import { Vehicle } from '../src/vehicle/entities/vehicle.entity';
import dataSourceTest from '../database/test/data-source-test';

const queryRunner = dataSourceTest.createQueryRunner();
const entities = {
  planets: 'planets',
  starships: 'starships',
  vehicles: 'vehicles',
  species: 'species',
  films: 'films',
  people: 'people',
};

export const fetchAndFillTablesTestDatabase = async () => {
  for (const entity in entities) {
    let url = `https://swapi.dev/api/${entity}`;

    while (url !== null) {
      const resultsObject = await fetch(url)
        .then((response) => response.json())
        .then((res) => {
          return res;
        });

      const { results, next } = resultsObject;

      await saveToDBWithoutRelations(results, entity);

      if (entity === 'films' || entity === 'people') {
        await setRelations(results, entity);
      }
      url = next;
    }
  }
};

async function saveToDBWithoutRelations(dataArray: [], entity: string) {
  const peopleRepository = dataSourceTest.getRepository(Person);
  const planetRepository = dataSourceTest.getRepository(Planet);
  const filmRepository = dataSourceTest.getRepository(Film);
  const speciesRepository = dataSourceTest.getRepository(Species);
  const vehicleRepository = dataSourceTest.getRepository(Vehicle);
  const starshipRepository = dataSourceTest.getRepository(Starship);

  dataArray.forEach((data: any) => {
    data.id = getIdFromUrl(data.url);

    if (entity === 'people') {
      data.homeworld = getIdFromUrl(data.homeworld);
    }

    if (entity === 'species') {
      if (data.homeworld === null || data.homeworld === undefined) {
        data.homeworld = null;
      } else {
        data.homeworld = getIdFromUrl(data.homeworld);
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

async function setRelations(dataArray: [], entity: string) {
  if (entity === 'people') {
    dataArray.forEach(async (person: any) => {
      person.id = getIdFromUrl(person.url);

      const filmsIds = getAllIdsFromEntity(person.films);
      const speciesIds = getAllIdsFromEntity(person.species);
      const vehiclesIds = getAllIdsFromEntity(person.vehicles);
      const starshipsIds = getAllIdsFromEntity(person.starships);

      Promise.all([
        insertRelationsToDatabase(filmsIds, person.id, entity, nameJoinedTables.person_film),
        insertRelationsToDatabase(speciesIds, person.id, entity, nameJoinedTables.person_species),
        insertRelationsToDatabase(vehiclesIds, person.id, entity, nameJoinedTables.person_vehicle),
        insertRelationsToDatabase(
          starshipsIds,
          person.id,
          entity,
          nameJoinedTables.person_starship,
        ),
      ]);
    });
  } else if (entity === 'films') {
    dataArray.forEach(async (film: any) => {
      film.id = getIdFromUrl(film.url);

      const planetsIds = getAllIdsFromEntity(film.planets);
      const speciesIds = getAllIdsFromEntity(film.species);
      const vehiclesIds = getAllIdsFromEntity(film.vehicles);
      const starshipsIds = getAllIdsFromEntity(film.starships);

      Promise.all([
        insertRelationsToDatabase(planetsIds, film.id, entity, nameJoinedTables.film_planet),
        insertRelationsToDatabase(speciesIds, film.id, entity, nameJoinedTables.film_species),
        insertRelationsToDatabase(starshipsIds, film.id, entity, nameJoinedTables.film_starship),
        insertRelationsToDatabase(vehiclesIds, film.id, entity, nameJoinedTables.film_vehicle),
      ]);
    });
  }
}

async function insertRelationsToDatabase(
  arrayEntityIds: number[],
  entityId: number,
  entity: string,
  nameTable: string,
) {
  await queryRunner.connect();

  const secondValue = nameTable.includes('species')
    ? nameTable.split('_')[1]
    : nameTable.split('_')[1] + 's';
  arrayEntityIds.forEach(async (id: number) => {
    await queryRunner.query(
      `INSERT INTO ${nameTable} (${entity}Id, ${secondValue}Id) VALUES (?, ?)`,
      [entityId, id],
    );
  });
}

function getAllIdsFromEntity(entitiesUrl: string[]): number[] {
  if (entitiesUrl === null || entitiesUrl === undefined) return [];
  return entitiesUrl.map((elem: string) => getIdFromUrl(elem));
}

function getIdFromUrl(url: string): number {
  if (url === null || url === undefined) return 0;
  return Number(url.match(/\d+/gm)?.join());
}
