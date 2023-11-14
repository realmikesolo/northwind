import { date, decimal, integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { customers } from './customer.entity';
import { shippers } from './shipper.entity';
import { employees } from './employee.entity';

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  employeeId: integer('employeeId')
    .references(() => employees.id)
    .notNull(),
  customerId: text('customerId')
    .references(() => customers.id)
    .notNull(),
  orderDate: date('orderDate').notNull(),
  requiredDate: date('requiredDate').notNull(),
  shippedDate: date('shippedDate'),
  shipVia: integer('shipVia')
    .references(() => shippers.id)
    .notNull(),
  freight: decimal('freight', { precision: 10, scale: 4 }).notNull(),
  shipName: text('shipName').notNull(),
  shipAddress: text('shipAddress').notNull(),
  shipCity: text('shipCity').notNull(),
  shipRegion: text('shipRegion'),
  shipPostalCode: text('shipPostalCode'),
  shipCountry: text('shipCountry').notNull(),
});

export type Order = typeof orders.$inferSelect;
