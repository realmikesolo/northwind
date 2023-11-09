import { DataSource } from 'typeorm';
import { Env } from '../env';
import { resolve } from 'node:path';

export const dataSource = new DataSource({
  type: 'postgres',
  host: Env.DB_HOST,
  port: Env.DB_PORT,
  database: Env.DB_NAME,
  username: Env.DB_USERNAME,
  password: Env.DB_PASSWORD,
  logging: true,
  migrationsRun: true,
  entities: [resolve(__dirname, '../../app/entities/*.entity.{js,ts}')],
  migrations: [resolve(__dirname, './migrations/*.{js,ts}')],
});

export async function connectDB(): Promise<void> {
  await dataSource.initialize();

  console.log('Database connected');
}
