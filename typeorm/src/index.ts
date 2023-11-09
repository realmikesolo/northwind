import 'dotenv/config';
import { Env } from './core/env';
import { startServer } from './server';
import { connectDB } from './core/db/db';
import { supplierRouter } from './app/routers/supplier.router';
import { productRouter } from './app/routers/product.router';
import { orderRouter } from './app/routers/order.router';
import { employeeRouter } from './app/routers/employee.router';
import { customerRouter } from './app/routers/customer.router';

(async () => {
  await connectDB();

  await startServer({
    host: Env.SERVER_HOST,
    port: Env.SERVER_PORT,
    routers: [supplierRouter, productRouter, orderRouter, employeeRouter, customerRouter],
  });
})();
