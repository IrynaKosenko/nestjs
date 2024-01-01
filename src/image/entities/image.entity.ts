import { Film } from '../../film/entities/film.entity';
import { Person } from '../../people/entities/person.entity';
import { Planet } from '../../planet/entities/planet.entity';
import { Species } from '../../species/entities/species.entity';
import { Starship } from '../../starship/entities/starship.entity';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'images' })
export class Image {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @ManyToOne(() => Person, (person) => person.images)
  person: Person | null;

  @ManyToOne(() => Planet, (planet) => planet.images)
  planet: Planet | null;

  @ManyToOne(() => Film, (film) => film.images)
  film: Film | null;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.images)
  vehicle: Vehicle | null;

  @ManyToOne(() => Species, (species) => species.images)
  species: Species | null;

  @ManyToOne(() => Starship, (starship) => starship.images)
  starship: Starship | null;
}
