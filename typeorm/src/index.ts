import 'dotenv/config';
import { Env } from './core/env';
import { startServer } from './server';
import { connectDB } from './core/db/db';

(async () => {
  await connectDB();

  await startServer({
    host: Env.SERVER_HOST,
    port: Env.SERVER_PORT,
    routers: [],
  });
})();
