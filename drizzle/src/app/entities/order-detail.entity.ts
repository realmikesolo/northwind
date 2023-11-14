import { decimal, integer, pgTable, primaryKey, real } from 'drizzle-orm/pg-core';
import { orders } from './order.entity';
import { products } from './product.entity';

export const orderDetails = pgTable(
  'order_details',
  {
    orderId: integer('orderId').references(() => orders.id),
    productId: integer('productId').references(() => products.id),
    unitPrice: decimal('unitPrice', { precision: 10, scale: 4 }).notNull(),
    quantity: integer('quantity').notNull(),
    discount: real('discount').notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.orderId, table.productId] }),
  }),
);

export type OrderDetail = typeof orderDetails.$inferSelect;
