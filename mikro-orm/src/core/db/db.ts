import { MikroORM } from '@mikro-orm/postgresql';
import config from './mikro-orm.config';

export let orm: MikroORM;

export async function connectDB(): Promise<void> {
  orm = await MikroORM.init(config);

  console.log('Database connected');
}
