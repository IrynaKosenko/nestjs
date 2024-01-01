import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Species } from '../../species/entities/species.entity';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';
import { Planet } from '../../planet/entities/planet.entity';
import { Starship } from '../../starship/entities/starship.entity';
import { Person } from '../../people/entities/person.entity';
import { AbstractEntity } from '../../common/abstract.entity';
import { Image } from '../../image/entities/image.entity';

@Entity({ name: 'films' })
export class Film extends AbstractEntity<Film> {
  @Column({ unique: true })
  title: string;
  @Column()
  episode_id: string;
  @Column()
  opening_crawl: string;
  @Column()
  director: string;
  @Column()
  producer: string;
  @Column()
  release_date: string;

  @ManyToMany(() => Person)
  @JoinTable({ name: 'person_film' })
  characters: Person[];

  @ManyToMany(() => Planet, { cascade: true })
  @JoinTable({ name: 'film_planet' })
  planets: Planet[];

  @ManyToMany(() => Starship, { cascade: true })
  @JoinTable({ name: 'film_starship' })
  starships: Starship[];

  @ManyToMany(() => Vehicle, { cascade: true })
  @JoinTable({ name: 'film_vehicle' })
  vehicles: Vehicle[];

  @ManyToMany(() => Species, { cascade: true })
  @JoinTable({ name: 'film_species' })
  species: Species[];

  @OneToMany(() => Image, (image) => image.film)
  images: Image[];
}
