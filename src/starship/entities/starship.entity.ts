import { AbstractEntity } from '../../common/abstract.entity';
import { Film } from '../../film/entities/film.entity';
import { Person } from '../../people/entities/person.entity';
import { Image } from '../../image/entities/image.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity({ name: 'starships' })
export class Starship extends AbstractEntity<Starship> {
  @Column({ unique: true })
  name: string;
  @Column()
  model: string;
  @Column()
  manufacturer: string;
  @Column()
  cost_in_credits: string;
  @Column()
  length: string;
  @Column()
  max_atmosphering_speed: string;
  @Column()
  crew: string;
  @Column()
  passengers: string;
  @Column()
  cargo_capacity: string;
  @Column()
  consumables: string;
  @Column()
  hyperdrive_rating: string;
  @Column()
  MGLT: string;
  @Column()
  starship_class: string;

  @ManyToMany(() => Person)
  @JoinTable({ name: 'person_starship' })
  pilots: Person[];

  @ManyToMany(() => Film)
  @JoinTable({ name: 'film_starship' })
  films: Film[];

  @OneToMany(() => Image, (image) => image.starship)
  images: Image[];
}
