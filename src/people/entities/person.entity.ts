import { Film } from '../../film/entities/film.entity';
import { Planet } from '../../planet/entities/planet.entity';
import { Starship } from '../../starship/entities/starship.entity';
import { Species } from '../../species/entities/species.entity';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';
import { Image } from '../../image/entities/image.entity';

@Entity({ name: 'people' })
export class Person extends AbstractEntity<Person> {
  @Column({ unique: true })
  name: string;
  @Column()
  height: string;
  @Column()
  mass: string;
  @Column()
  hair_color: string;
  @Column()
  skin_color: string;
  @Column()
  eye_color: string;
  @Column()
  birth_year: string;
  @Column()
  gender: string;

  @ManyToOne(() => Planet, (planet) => planet.residents)
  homeworld?: Planet | null;

  @ManyToMany(() => Film, { cascade: true })
  @JoinTable({ name: 'person_film' })
  films: Film[];

  @ManyToMany(() => Species, { cascade: true })
  @JoinTable({ name: 'person_species' })
  species: Species[];

  @ManyToMany(() => Vehicle, { cascade: true })
  @JoinTable({ name: 'person_vehicle' })
  vehicles: Vehicle[];

  @ManyToMany(() => Starship, { cascade: true })
  @JoinTable({ name: 'person_starship' })
  starships: Starship[];

  @OneToMany(() => Image, (image) => image.starship)
  images: Image[];
}

// @BeforeInsert()
//   async setPassword(password: string) {
//     const salt = await bcrypt.genSalt()
//     this.password = await bcrypt.hash(password || this.password, salt)
//   }
