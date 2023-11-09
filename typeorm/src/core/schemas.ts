import { z } from 'zod';

export const AutoIncrementSchema = z
  .string()
  .transform((val) => Number.parseInt(val, 10))
  .refine((val) => !Number.isNaN(val) && val >= 1, { message: 'ID must be a positive number' });

export const LimitSchema = z
  .string()
  .transform((val) => Number.parseInt(val, 10))
  .refine((val) => !Number.isNaN(val) && val >= 1 && val <= 100, {
    message: 'Limit must be a number between 1 and 100',
  });

export const PageSchema = z
  .string()
  .transform((val) => Number.parseInt(val, 10))
  .refine((val) => !Number.isNaN(val) && val >= 0, {
    message: 'Offset must be a non-negative number',
  });

export const SearchSchema = z.string();
