import { AbstractEntity } from '../../common/abstract.entity';
import { Film } from '../../film/entities/film.entity';
import { Person } from '../../people/entities/person.entity';
import { Image } from '../../image/entities/image.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity({ name: 'planets' })
export class Planet extends AbstractEntity<Planet> {
  @Column({ unique: true })
  name: string;

  @Column()
  rotation_period: string;

  @Column()
  orbital_period: string;

  @Column()
  diameter: string;

  @Column()
  climate: string;

  @Column()
  gravity: string;

  @Column()
  terrain: string;

  @Column()
  surface_water: string;

  @Column()
  population: string;

  @OneToMany(() => Person, (person) => person.homeworld)
  residents: Person[];

  @ManyToMany(() => Film)
  @JoinTable({ name: 'film_planet' })
  films: Film[];

  @OneToMany(() => Image, (image) => image.planet)
  images: Image[];
}
