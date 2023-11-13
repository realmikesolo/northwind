import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../core/db/db';
import { HttpStatus } from '../../core/http-status';
import { LimitSchema, PageSchema } from '../../core/schemas';
import { SupplierSchema } from '../schemas/supplier.schema';
import { SupplierService } from '../services/supplier.service';

export async function supplierRouter(router: Router): Promise<void> {
  const supplierService = new SupplierService(prisma);

  router.get('/suppliers', async (req, res, next) => {
    try {
      const { query } = await SupplierListRequestSchema.parseAsync({ query: req.query });

      const response = await supplierService.list({ query });

      res.status(HttpStatus.OK).json(response);
    } catch (e) {
      next(e);
    }
  });

  router.get('/suppliers/:id', async (req, res, next) => {
    try {
      const { params } = await SupplierGetRequestSchema.parseAsync({ params: req.params });

      const response = await supplierService.get({ params });

      res.status(HttpStatus.OK).json(response);
    } catch (e) {
      next(e);
    }
  });
}

const SupplierListRequestSchema = z
  .object({
    query: z
      .object({
        limit: LimitSchema,
        page: PageSchema,
      })
      .strict(),
  })
  .strict();

export type SupplierListRequestDto = z.infer<typeof SupplierListRequestSchema>;

const SupplierGetRequestSchema = z
  .object({
    params: z
      .object({
        id: SupplierSchema.id,
      })
      .strict(),
  })
  .strict();

export type SupplierGetRequestDto = z.infer<typeof SupplierGetRequestSchema>;
