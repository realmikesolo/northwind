import { Client } from 'pg';
import { Env } from '../env';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { resolve } from 'node:path';
import * as schema from '../../app/entities';

const client = new Client({
  host: Env.DB_HOST,
  port: Env.DB_PORT,
  user: Env.DB_USERNAME,
  password: Env.DB_PASSWORD,
  database: Env.DB_NAME,
});

export const db = drizzle(client, { schema });

export async function connectDB(): Promise<void> {
  await client.connect();

  await migrate(db, { migrationsFolder: resolve(__dirname, './migrations') });
  console.log('Database connected');
}

export type Drizzle = NodePgDatabase<typeof schema>;
