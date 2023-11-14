import { boolean, decimal, integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { suppliers } from './supplier.entity';
import { categories } from './category.entity';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  supplierId: integer('supplierId')
    .references(() => suppliers.id)
    .notNull(),
  categoryId: integer('categoryId')
    .references(() => categories.id)
    .notNull(),
  quantityPerUnit: text('quantityPerUnit').notNull(),
  unitPrice: decimal('unitPrice', { precision: 10, scale: 4 }).notNull(),
  unitsInStock: integer('unitsInStock').notNull(),
  unitsOnOrder: integer('unitsOnOrder').notNull(),
  reorderLevel: integer('reorderLevel').notNull(),
  discontinued: boolean('discontinued').notNull(),
});

export type Product = typeof products.$inferSelect;
