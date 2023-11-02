import 'dotenv/config';
import { Env } from './core/env';
import { startServer } from './server';

(async () => {
  await startServer({
    host: Env.SERVER_HOST,
    port: Env.SERVER_PORT,
    routers: [],
  });
})();
