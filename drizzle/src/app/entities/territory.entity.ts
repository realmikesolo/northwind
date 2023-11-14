import { integer, pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { regions } from './region.entity';

export const territories = pgTable('territories', {
  id: varchar('id', { length: 20 }).primaryKey(),
  description: text('description').notNull(),
  regionId: integer('regionId')
    .references(() => regions.id)
    .notNull(),
});

export type Territory = typeof territories.$inferSelect;
