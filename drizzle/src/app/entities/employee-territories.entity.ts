import { integer, pgTable, primaryKey, text } from 'drizzle-orm/pg-core';
import { territories } from './territory.entity';
import { employees } from './employee.entity';

export const employeeTerritories = pgTable(
  'employee_territories',
  {
    employeeId: integer('employeeId').references(() => employees.id),
    territoryId: text('territoryId').references(() => territories.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.employeeId, table.territoryId] }),
  }),
);

export type EmployeeTerritory = typeof employeeTerritories.$inferSelect;
