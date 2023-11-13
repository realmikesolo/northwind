import { z } from 'zod';

export const CustomerSchema = {
  id: z.string().max(5),
  companyName: z.string().min(2).max(40),
  contactName: z.string().min(2).max(30),
  contactTitle: z.string().min(2).max(30),
  address: z.string().min(2).max(60).optional(),
  city: z.string().min(2).max(15).optional(),
  region: z.string().min(2).max(15).optional(),
  postalCode: z.string().min(2).max(10).optional(),
  country: z.string().min(2).max(15).optional(),
  phone: z.string().min(2).max(24).optional(),
  fax: z.string().min(2).max(24).optional(),
};
