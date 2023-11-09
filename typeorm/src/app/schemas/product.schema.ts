import { z } from 'zod';
import { SupplierSchema } from './supplier.schema';
import { AutoIncrementSchema } from '../../core/schemas';

export const ProductSchema = {
  id: AutoIncrementSchema,
  name: z.string().min(2).max(40),
  quantityPerUnit: z.string().min(2).max(20),
  supplierId: SupplierSchema.id,
  categoryId: AutoIncrementSchema,
  unitPrice: z.number().min(0),
  unitsInStock: z.number().min(0),
  unitsOnOrder: z.number().min(0),
  reorderLevel: z.number().min(0),
  discontinued: z.boolean(),
};
