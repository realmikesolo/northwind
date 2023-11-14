import { pgTable, text, varchar } from 'drizzle-orm/pg-core';

export const customers = pgTable('customers', {
  id: varchar('id', { length: 5 }).primaryKey(),
  companyName: text('companyName').notNull(),
  contactName: text('contactName').notNull(),
  contactTitle: text('contactTitle').notNull(),
  address: text('address'),
  city: text('city'),
  region: text('region'),
  postalCode: text('postalCode'),
  country: text('country'),
  phone: text('phone'),
  fax: text('fax'),
});

export type Customer = typeof customers.$inferSelect;
