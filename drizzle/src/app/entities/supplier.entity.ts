import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const suppliers = pgTable('suppliers', {
  id: serial('id').primaryKey(),
  companyName: text('companyName').notNull(),
  contactName: text('contactName').notNull(),
  contactTitle: text('contactTitle').notNull(),
  address: text('address').notNull(),
  city: text('city').notNull(),
  region: text('region'),
  postalCode: text('postalCode').notNull(),
  country: text('country').notNull(),
  phone: text('phone').notNull(),
  fax: text('fax'),
  homePage: text('homePage'),
});

export type Supplier = typeof suppliers.$inferSelect;
