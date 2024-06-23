import { Exclude } from 'class-transformer';
import { Column, PrimaryColumn } from 'typeorm';

export class AbstractEntity<T> {
  @Exclude()
  @PrimaryColumn({ unique: true })
  id: number;

  @Exclude()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Exclude()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  edited: Date;

  @Column()
  @Exclude()
  url: string;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
