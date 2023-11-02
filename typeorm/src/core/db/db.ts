import { DataSource } from 'typeorm';
import { Env } from '../env';
import { resolve } from 'node:path';

export let dataSource: DataSource;

export async function connectDB(): Promise<void> {
  dataSource = new DataSource({
    type: 'postgres',
    host: Env.DB_HOST,
    port: Env.DB_PORT,
    database: Env.DB_NAME,
    username: Env.DB_USERNAME,
    password: Env.DB_PASSWORD,
    logging: true,
    entities: [resolve(__dirname, '../app/entities/*.entity.{js,ts}')],
  });

  await dataSource.initialize();

  console.log('Database connected');
}
