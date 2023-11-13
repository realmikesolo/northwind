import { z } from 'zod';
import { AutoIncrementSchema } from '../../core/schemas';
import { SupplierSchema } from './supplier.schema';
import { CustomerSchema } from './customer.schema';
import { EmployeeSchema } from './employee.schema';

export const OrderSchema = {
  id: AutoIncrementSchema,
  customerId: CustomerSchema.id,
  employeeId: EmployeeSchema.id,
  orderDate: z.date(),
  requiredDate: z.date(),
  shippedDate: z.date(),
  shipVia: SupplierSchema.id,
  freight: z.number(),
  shipName: z.string(),
  shipAddress: z.string(),
  shipCity: z.string(),
  shipRegion: z.string(),
  shipPostalCode: z.string(),
  shipCountry: z.string(),
};
