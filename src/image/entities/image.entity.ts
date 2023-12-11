import { Film } from 'src/film/entities/film.entity';
import { Person } from 'src/people/entities/person.entity';
import { Planet } from 'src/planet/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starship } from 'src/starship/entities/starship.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

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
