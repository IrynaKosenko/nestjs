import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniquiKeysMigration1702160861989 implements MigrationInterface {
    name = 'AddUniquiKeysMigration1702160861989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`id\` ON \`films\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`id\` ON \`films\` (\`id\`)`);
    }

}
