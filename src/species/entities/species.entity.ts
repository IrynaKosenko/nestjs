import { AbstractEntity } from '../../common/abstract.entity';
import { Film } from '../../film/entities/film.entity';
import { Person } from '../../people/entities/person.entity';
import { Planet } from '../../planet/entities/planet.entity';
import { Image } from '../../image/entities/image.entity';
import { Column, ManyToMany, OneToOne, Entity, JoinColumn, JoinTable, OneToMany } from 'typeorm';

@Entity({ name: 'species' })
export class Species extends AbstractEntity<Species> {
  @Column({ unique: true })
  name: string;
  @Column()
  classification: string;
  @Column()
  designation: string;
  @Column()
  average_height: string;
  @Column()
  skin_colors: string;
  @Column()
  hair_colors: string;
  @Column()
  eye_colors: string;
  @Column()
  average_lifespan: string;

  @OneToOne(() => Planet, (planet) => planet.id, { nullable: true })
  @JoinColumn()
  homeworld?: Planet | null;

  @Column()
  language: string;

  @ManyToMany(() => Person)
  @JoinTable({ name: 'person_species' })
  people: Person[];

  @ManyToMany(() => Film)
  @JoinTable({ name: 'film_species' })
  films: Film[];

  @OneToMany(() => Image, (image) => image.species)
  images: Image[];
}
