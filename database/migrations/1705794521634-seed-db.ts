import { SeedingDatabase } from 'database/seeding-database';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seeding1705794521634 implements MigrationInterface {
  name = 'Seeding1705794521634';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const seeding = new SeedingDatabase(queryRunner);
    await seeding.getDataAndFillTables();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const seeding = new SeedingDatabase(queryRunner);
    await seeding.clearTables();
  }
}
