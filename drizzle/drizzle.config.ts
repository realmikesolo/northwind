import type { Config } from 'drizzle-kit';
import { Env } from './src/core/env';
import { resolve } from 'node:path';

export default {
  driver: 'pg',
  out: resolve(__dirname, './src/core/db/migrations'),
  schema: [resolve(__dirname, './src/app/entities/*.entity.ts')],
  dbCredentials: {
    host: Env.DB_HOST,
    port: Env.DB_PORT,
    user: Env.DB_USERNAME,
    password: Env.DB_PASSWORD,
    database: Env.DB_NAME,
  },
} satisfies Config;
