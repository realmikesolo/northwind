import { date, foreignKey, integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const employees = pgTable(
  'employees',
  {
    id: serial('id').primaryKey(),
    firstName: text('firstName').notNull(),
    lastName: text('lastName').notNull(),
    title: text('title').notNull(),
    titleOfCourtesy: text('titleOfCourtesy').notNull(),
    birthDate: date('birthDate').notNull(),
    hireDate: date('hireDate').notNull(),
    address: text('address').notNull(),
    city: text('city').notNull(),
    region: text('region'),
    postalCode: text('postalCode').notNull(),
    country: text('country').notNull(),
    homePhone: text('homePhone').notNull(),
    extension: text('extension').notNull(),
    notes: text('notes').notNull(),
    reportsTo: integer('reportsTo'),
  },
  (table) => ({
    managerReference: foreignKey({ columns: [table.reportsTo], foreignColumns: [table.id] }),
  }),
);

export type Employee = typeof employees.$inferSelect;
