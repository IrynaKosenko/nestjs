import { MigrationInterface, QueryRunner } from "typeorm";

export class Newmigration1703794521634 implements MigrationInterface {
    name = 'Newmigration1703794521634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`starships\` (\`id\` int NOT NULL, \`created\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`edited\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`url\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`hyperdrive_rating\` varchar(255) NOT NULL, \`MGLT\` varchar(255) NOT NULL, \`starship_class\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_41580e76da7903fb3827a3510e\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vehicles\` (\`id\` int NOT NULL, \`created\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`edited\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`url\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`vehicle_class\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_aa397b791341ed3615397050d4\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`images\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`personId\` int NULL, \`planetId\` int NULL, \`filmId\` int NULL, \`vehicleId\` int NULL, \`speciesId\` int NULL, \`starshipId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`planets\` (\`id\` int NOT NULL, \`created\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`edited\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`url\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`rotation_period\` varchar(255) NOT NULL, \`orbital_period\` varchar(255) NOT NULL, \`diameter\` varchar(255) NOT NULL, \`climate\` varchar(255) NOT NULL, \`gravity\` varchar(255) NOT NULL, \`terrain\` varchar(255) NOT NULL, \`surface_water\` varchar(255) NOT NULL, \`population\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_70a170f032a2ca04a6ec6eb2d9\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`people\` (\`id\` int NOT NULL, \`created\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`edited\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`url\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`height\` varchar(255) NOT NULL, \`mass\` varchar(255) NOT NULL, \`hair_color\` varchar(255) NOT NULL, \`skin_color\` varchar(255) NOT NULL, \`eye_color\` varchar(255) NOT NULL, \`birth_year\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`homeworldId\` int NULL, UNIQUE INDEX \`IDX_e7ec00b080e693706a6eaa6d31\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`species\` (\`id\` int NOT NULL, \`created\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`edited\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`url\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`classification\` varchar(255) NOT NULL, \`designation\` varchar(255) NOT NULL, \`average_height\` varchar(255) NOT NULL, \`skin_colors\` varchar(255) NOT NULL, \`hair_colors\` varchar(255) NOT NULL, \`eye_colors\` varchar(255) NOT NULL, \`average_lifespan\` varchar(255) NOT NULL, \`language\` varchar(255) NOT NULL, \`homeworldId\` int NULL, UNIQUE INDEX \`IDX_1adf701cac3b2c0f8bacb54774\` (\`name\`), UNIQUE INDEX \`REL_3427f7c92316561d7131c296bc\` (\`homeworldId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`films\` (\`id\` int NOT NULL, \`created\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`edited\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`url\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`episode_id\` varchar(255) NOT NULL, \`opening_crawl\` varchar(255) NOT NULL, \`director\` varchar(255) NOT NULL, \`producer\` varchar(255) NOT NULL, \`release_date\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ef6e0245decf772d1dd66f158a\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('user', 'admin') NOT NULL DEFAULT 'user', UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`person_starship\` (\`starshipsId\` int NOT NULL, \`peopleId\` int NOT NULL, INDEX \`IDX_943d00e1bbb224a9d349b78471\` (\`starshipsId\`), INDEX \`IDX_8eda29e9193cc969bd4d617e78\` (\`peopleId\`), PRIMARY KEY (\`starshipsId\`, \`peopleId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`film_starship\` (\`starshipsId\` int NOT NULL, \`filmsId\` int NOT NULL, INDEX \`IDX_8bb4d2c83e8b236ce233a45e6d\` (\`starshipsId\`), INDEX \`IDX_d27cc76ee83d5dc3e582ff45a0\` (\`filmsId\`), PRIMARY KEY (\`starshipsId\`, \`filmsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`person_vehicle\` (\`vehiclesId\` int NOT NULL, \`peopleId\` int NOT NULL, INDEX \`IDX_8f2d3260186985cc07abe66423\` (\`vehiclesId\`), INDEX \`IDX_389eaccb535fe6bb001449acae\` (\`peopleId\`), PRIMARY KEY (\`vehiclesId\`, \`peopleId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`film_vehicle\` (\`vehiclesId\` int NOT NULL, \`filmsId\` int NOT NULL, INDEX \`IDX_c2e867709345c5d1d4a8d88139\` (\`vehiclesId\`), INDEX \`IDX_58ee49a8302e689d8c3f181525\` (\`filmsId\`), PRIMARY KEY (\`vehiclesId\`, \`filmsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`film_planet\` (\`planetsId\` int NOT NULL, \`filmsId\` int NOT NULL, INDEX \`IDX_841bbaf8204fa6ec8bc0f35981\` (\`planetsId\`), INDEX \`IDX_8d9f4969d3fc07ac7c199a17cd\` (\`filmsId\`), PRIMARY KEY (\`planetsId\`, \`filmsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`person_film\` (\`peopleId\` int NOT NULL, \`filmsId\` int NOT NULL, INDEX \`IDX_b93b84160141c55f430dd8adb4\` (\`peopleId\`), INDEX \`IDX_8940ff7570f8baa465a65723ea\` (\`filmsId\`), PRIMARY KEY (\`peopleId\`, \`filmsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`person_species\` (\`peopleId\` int NOT NULL, \`speciesId\` int NOT NULL, INDEX \`IDX_af71e5cfa601bea4719fe9dea4\` (\`peopleId\`), INDEX \`IDX_786dbbf6a74af9ec02090a0d63\` (\`speciesId\`), PRIMARY KEY (\`peopleId\`, \`speciesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`film_species\` (\`speciesId\` int NOT NULL, \`filmsId\` int NOT NULL, INDEX \`IDX_f7ac9ebb935b4dca8ff1a1ed52\` (\`speciesId\`), INDEX \`IDX_03b06c6a3fbae1d661e61c7683\` (\`filmsId\`), PRIMARY KEY (\`speciesId\`, \`filmsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_662089e42a27a165afcb4e0812d\` FOREIGN KEY (\`personId\`) REFERENCES \`people\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_827828ca25918647b0dc1c15a93\` FOREIGN KEY (\`planetId\`) REFERENCES \`planets\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_93aa31698eba7a22fd1cd0c97e3\` FOREIGN KEY (\`filmId\`) REFERENCES \`films\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_f8239c66e6363f66f00eb581265\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_c02a4e67aceb74f955901a6464a\` FOREIGN KEY (\`speciesId\`) REFERENCES \`species\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images\` ADD CONSTRAINT \`FK_cb4c7f81fd22b3ee81abb46d995\` FOREIGN KEY (\`starshipId\`) REFERENCES \`starships\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`people\` ADD CONSTRAINT \`FK_8f79bb098a482fa585da15ef3a6\` FOREIGN KEY (\`homeworldId\`) REFERENCES \`planets\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`species\` ADD CONSTRAINT \`FK_3427f7c92316561d7131c296bc6\` FOREIGN KEY (\`homeworldId\`) REFERENCES \`planets\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`person_starship\` ADD CONSTRAINT \`FK_943d00e1bbb224a9d349b784718\` FOREIGN KEY (\`starshipsId\`) REFERENCES \`starships\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`person_starship\` ADD CONSTRAINT \`FK_8eda29e9193cc969bd4d617e78f\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`film_starship\` ADD CONSTRAINT \`FK_8bb4d2c83e8b236ce233a45e6d3\` FOREIGN KEY (\`starshipsId\`) REFERENCES \`starships\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`film_starship\` ADD CONSTRAINT \`FK_d27cc76ee83d5dc3e582ff45a06\` FOREIGN KEY (\`filmsId\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`person_vehicle\` ADD CONSTRAINT \`FK_8f2d3260186985cc07abe664234\` FOREIGN KEY (\`vehiclesId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`person_vehicle\` ADD CONSTRAINT \`FK_389eaccb535fe6bb001449acae4\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`film_vehicle\` ADD CONSTRAINT \`FK_c2e867709345c5d1d4a8d881394\` FOREIGN KEY (\`vehiclesId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`film_vehicle\` ADD CONSTRAINT \`FK_58ee49a8302e689d8c3f1815255\` FOREIGN KEY (\`filmsId\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`film_planet\` ADD CONSTRAINT \`FK_841bbaf8204fa6ec8bc0f35981f\` FOREIGN KEY (\`planetsId\`) REFERENCES \`planets\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`film_planet\` ADD CONSTRAINT \`FK_8d9f4969d3fc07ac7c199a17cd8\` FOREIGN KEY (\`filmsId\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`person_film\` ADD CONSTRAINT \`FK_b93b84160141c55f430dd8adb46\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`person_film\` ADD CONSTRAINT \`FK_8940ff7570f8baa465a65723ea1\` FOREIGN KEY (\`filmsId\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`person_species\` ADD CONSTRAINT \`FK_af71e5cfa601bea4719fe9dea4b\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`person_species\` ADD CONSTRAINT \`FK_786dbbf6a74af9ec02090a0d63c\` FOREIGN KEY (\`speciesId\`) REFERENCES \`species\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`film_species\` ADD CONSTRAINT \`FK_f7ac9ebb935b4dca8ff1a1ed52b\` FOREIGN KEY (\`speciesId\`) REFERENCES \`species\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`film_species\` ADD CONSTRAINT \`FK_03b06c6a3fbae1d661e61c7683b\` FOREIGN KEY (\`filmsId\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`film_species\` DROP FOREIGN KEY \`FK_03b06c6a3fbae1d661e61c7683b\``);
        await queryRunner.query(`ALTER TABLE \`film_species\` DROP FOREIGN KEY \`FK_f7ac9ebb935b4dca8ff1a1ed52b\``);
        await queryRunner.query(`ALTER TABLE \`person_species\` DROP FOREIGN KEY \`FK_786dbbf6a74af9ec02090a0d63c\``);
        await queryRunner.query(`ALTER TABLE \`person_species\` DROP FOREIGN KEY \`FK_af71e5cfa601bea4719fe9dea4b\``);
        await queryRunner.query(`ALTER TABLE \`person_film\` DROP FOREIGN KEY \`FK_8940ff7570f8baa465a65723ea1\``);
        await queryRunner.query(`ALTER TABLE \`person_film\` DROP FOREIGN KEY \`FK_b93b84160141c55f430dd8adb46\``);
        await queryRunner.query(`ALTER TABLE \`film_planet\` DROP FOREIGN KEY \`FK_8d9f4969d3fc07ac7c199a17cd8\``);
        await queryRunner.query(`ALTER TABLE \`film_planet\` DROP FOREIGN KEY \`FK_841bbaf8204fa6ec8bc0f35981f\``);
        await queryRunner.query(`ALTER TABLE \`film_vehicle\` DROP FOREIGN KEY \`FK_58ee49a8302e689d8c3f1815255\``);
        await queryRunner.query(`ALTER TABLE \`film_vehicle\` DROP FOREIGN KEY \`FK_c2e867709345c5d1d4a8d881394\``);
        await queryRunner.query(`ALTER TABLE \`person_vehicle\` DROP FOREIGN KEY \`FK_389eaccb535fe6bb001449acae4\``);
        await queryRunner.query(`ALTER TABLE \`person_vehicle\` DROP FOREIGN KEY \`FK_8f2d3260186985cc07abe664234\``);
        await queryRunner.query(`ALTER TABLE \`film_starship\` DROP FOREIGN KEY \`FK_d27cc76ee83d5dc3e582ff45a06\``);
        await queryRunner.query(`ALTER TABLE \`film_starship\` DROP FOREIGN KEY \`FK_8bb4d2c83e8b236ce233a45e6d3\``);
        await queryRunner.query(`ALTER TABLE \`person_starship\` DROP FOREIGN KEY \`FK_8eda29e9193cc969bd4d617e78f\``);
        await queryRunner.query(`ALTER TABLE \`person_starship\` DROP FOREIGN KEY \`FK_943d00e1bbb224a9d349b784718\``);
        await queryRunner.query(`ALTER TABLE \`species\` DROP FOREIGN KEY \`FK_3427f7c92316561d7131c296bc6\``);
        await queryRunner.query(`ALTER TABLE \`people\` DROP FOREIGN KEY \`FK_8f79bb098a482fa585da15ef3a6\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_cb4c7f81fd22b3ee81abb46d995\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_c02a4e67aceb74f955901a6464a\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_f8239c66e6363f66f00eb581265\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_93aa31698eba7a22fd1cd0c97e3\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_827828ca25918647b0dc1c15a93\``);
        await queryRunner.query(`ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_662089e42a27a165afcb4e0812d\``);
        await queryRunner.query(`DROP INDEX \`IDX_03b06c6a3fbae1d661e61c7683\` ON \`film_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_f7ac9ebb935b4dca8ff1a1ed52\` ON \`film_species\``);
        await queryRunner.query(`DROP TABLE \`film_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_786dbbf6a74af9ec02090a0d63\` ON \`person_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_af71e5cfa601bea4719fe9dea4\` ON \`person_species\``);
        await queryRunner.query(`DROP TABLE \`person_species\``);
        await queryRunner.query(`DROP INDEX \`IDX_8940ff7570f8baa465a65723ea\` ON \`person_film\``);
        await queryRunner.query(`DROP INDEX \`IDX_b93b84160141c55f430dd8adb4\` ON \`person_film\``);
        await queryRunner.query(`DROP TABLE \`person_film\``);
        await queryRunner.query(`DROP INDEX \`IDX_8d9f4969d3fc07ac7c199a17cd\` ON \`film_planet\``);
        await queryRunner.query(`DROP INDEX \`IDX_841bbaf8204fa6ec8bc0f35981\` ON \`film_planet\``);
        await queryRunner.query(`DROP TABLE \`film_planet\``);
        await queryRunner.query(`DROP INDEX \`IDX_58ee49a8302e689d8c3f181525\` ON \`film_vehicle\``);
        await queryRunner.query(`DROP INDEX \`IDX_c2e867709345c5d1d4a8d88139\` ON \`film_vehicle\``);
        await queryRunner.query(`DROP TABLE \`film_vehicle\``);
        await queryRunner.query(`DROP INDEX \`IDX_389eaccb535fe6bb001449acae\` ON \`person_vehicle\``);
        await queryRunner.query(`DROP INDEX \`IDX_8f2d3260186985cc07abe66423\` ON \`person_vehicle\``);
        await queryRunner.query(`DROP TABLE \`person_vehicle\``);
        await queryRunner.query(`DROP INDEX \`IDX_d27cc76ee83d5dc3e582ff45a0\` ON \`film_starship\``);
        await queryRunner.query(`DROP INDEX \`IDX_8bb4d2c83e8b236ce233a45e6d\` ON \`film_starship\``);
        await queryRunner.query(`DROP TABLE \`film_starship\``);
        await queryRunner.query(`DROP INDEX \`IDX_8eda29e9193cc969bd4d617e78\` ON \`person_starship\``);
        await queryRunner.query(`DROP INDEX \`IDX_943d00e1bbb224a9d349b78471\` ON \`person_starship\``);
        await queryRunner.query(`DROP TABLE \`person_starship\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_ef6e0245decf772d1dd66f158a\` ON \`films\``);
        await queryRunner.query(`DROP TABLE \`films\``);
        await queryRunner.query(`DROP INDEX \`REL_3427f7c92316561d7131c296bc\` ON \`species\``);
        await queryRunner.query(`DROP INDEX \`IDX_1adf701cac3b2c0f8bacb54774\` ON \`species\``);
        await queryRunner.query(`DROP TABLE \`species\``);
        await queryRunner.query(`DROP INDEX \`IDX_e7ec00b080e693706a6eaa6d31\` ON \`people\``);
        await queryRunner.query(`DROP TABLE \`people\``);
        await queryRunner.query(`DROP INDEX \`IDX_70a170f032a2ca04a6ec6eb2d9\` ON \`planets\``);
        await queryRunner.query(`DROP TABLE \`planets\``);
        await queryRunner.query(`DROP TABLE \`images\``);
        await queryRunner.query(`DROP INDEX \`IDX_aa397b791341ed3615397050d4\` ON \`vehicles\``);
        await queryRunner.query(`DROP TABLE \`vehicles\``);
        await queryRunner.query(`DROP INDEX \`IDX_41580e76da7903fb3827a3510e\` ON \`starships\``);
        await queryRunner.query(`DROP TABLE \`starships\``);
    }

}
