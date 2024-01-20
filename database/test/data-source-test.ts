import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const dataSourceOptionsTest: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_TEST_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.TEST_DATABASE_USER,
  password: process.env.TEST_DATABASE_PASSWORD,
  database: process.env.TEST_DATABASE,
  entities: ['dist/**/**/entities/*.entity.js'],
  migrations: ['dist/database/test/migrations/*.js'],
};

const dataSourceTest = new DataSource(dataSourceOptionsTest);
export default dataSourceTest;

dataSourceTest
  .initialize()
  .then(() => {
    console.log('Data Source Test has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
