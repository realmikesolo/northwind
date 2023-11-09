import { z } from 'zod';
import { AutoIncrementSchema } from '../../core/schemas';

export const EmployeeSchema = {
  id: AutoIncrementSchema,
  firstName: z.string().min(2).max(10),
  lastName: z.string().min(2).max(20),
  title: z.string().min(2).max(30),
  titleOfCourtesy: z.string().min(2).max(25),
  birthDate: z.date(),
  hireDate: z.date(),
  address: z.string().min(2).max(60),
  city: z.string().min(2).max(15),
  region: z.string().min(2).max(15),
  postalCode: z.string().min(2).max(10),
  country: z.string().min(2).max(15),
  homePhone: z.string().min(2).max(24),
  extension: z.string().min(2).max(4),
  notes: z.string().min(2).max(255),
  reportsTo: AutoIncrementSchema,
};
