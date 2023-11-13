import { defineConfig } from '@mikro-orm/postgresql';
import 'dotenv/config';
import { resolve } from 'node:path';
import { Env } from '../env';

export default defineConfig({
  entities: [resolve(__dirname, '../../app/entities/*.entity.js')],
  entitiesTs: [resolve(__dirname, '../../app/entities/*.entity.ts')],
  dbName: Env.DB_NAME,
  user: Env.DB_USERNAME,
  password: Env.DB_PASSWORD,
  host: Env.DB_HOST,
  port: Env.DB_PORT,
  debug: true,
  migrations: {
    path: resolve(__dirname, './migrations'),
    pathTs: resolve(__dirname, './migrations'),
    glob: '!(*.d).{js,ts}',
    allOrNothing: true,
  },
});
