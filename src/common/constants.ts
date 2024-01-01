export const url = 'https://swapi.dev/api/';

export enum Role {
  User = 'user',
  Admin = 'admin',
}
export enum Gender {
  FEMALE = 'female',
  MALE = 'male',
  N_A = 'n/a',
}
export const entities = {
  planets: 'planets',
  starships: 'starships',
  vehicles: 'vehicles',
  species: 'species',
  images: 'images',
  films: 'films',
  people: 'people',
};

export const entitiesForSeeding = {
  planets: 'planets',
  starships: 'starships',
  vehicles: 'vehicles',
  species: 'species',
  films: 'films',
  people: 'people',
};

export const nameJoinedTables = {
  film_planet: 'film_planet',
  film_species: 'film_species',
  film_starship: 'film_starship',
  film_vehicle: 'film_vehicle',
  person_film: 'person_film',
  person_species: 'person_species',
  person_starship: 'person_starship',
  person_vehicle: 'person_vehicle',
};
