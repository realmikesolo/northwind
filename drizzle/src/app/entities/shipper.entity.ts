import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const shippers = pgTable('shippers', {
  id: serial('id').primaryKey(),
  companyName: text('companyName').notNull(),
  phone: text('phone').notNull(),
});

export type Shipper = typeof shippers.$inferSelect;
