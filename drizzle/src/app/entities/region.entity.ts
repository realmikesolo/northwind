import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const regions = pgTable('regions', {
  id: serial('id').primaryKey(),
  description: text('description').notNull(),
});

export type Region = typeof regions.$inferSelect;
