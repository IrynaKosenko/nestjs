import { AbstractEntity } from 'src/common/abstract.entity';
import { Film } from 'src/film/entities/film.entity';
import { Person } from 'src/people/entities/person.entity';
import { Image } from 'src/image/entities/image.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity({ name: 'vehicles' })
export class Vehicle extends AbstractEntity<Vehicle> {
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
  vehicle_class: string;

  @ManyToMany(() => Person)
  @JoinTable({ name: 'person_vehicle' })
  pilots: Person[];

  @ManyToMany(() => Film)
  @JoinTable({ name: 'film_vehicle' })
  films: Film[];

  @OneToMany(() => Image, (image) => image.vehicle)
  images: Image[];
}
