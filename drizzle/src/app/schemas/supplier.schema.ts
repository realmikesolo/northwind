import { z } from 'zod';
import { AutoIncrementSchema } from '../../core/schemas';

export const SupplierSchema = {
  id: AutoIncrementSchema,
  companyName: z.string().min(2).max(40),
  contactName: z.string().min(2).max(30),
  contactTitle: z.string().min(2).max(30),
  address: z.string().min(2).max(60),
  city: z.string().min(2).max(15),
  region: z.string().min(2).max(15).optional(),
  postalCode: z.string().min(2).max(10),
  country: z.string().min(2).max(15),
  phone: z.string().min(2).max(24),
  fax: z.string().min(2).max(24).optional(),
  homePage: z.string().min(2).max(255).optional(),
};
