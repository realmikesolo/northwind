import { Router } from 'express';
import { z } from 'zod';
import { LimitSchema, PageSchema, SearchSchema } from '../../core/schemas';
import { HttpStatus } from '../../core/http-status';
import { CustomerService } from '../services/customer.service';
import { Repository } from 'typeorm';
import { dataSource } from '../../core/db/db';
import { Customer } from '../entities/customer.entity';
import { CustomerSchema } from '../schemas/customer.schema';

const customerService = new CustomerService(new Repository(Customer, dataSource.manager));

export async function customerRouter(router: Router): Promise<void> {
  router.get('/customers', async (req, res, next) => {
    try {
      const { query } = await CustomerListRequestSchema.parseAsync({ query: req.query });

      const response = await customerService.list({ query });

      res.status(HttpStatus.OK).json(response);
    } catch (e) {
      next(e);
    }
  });

  router.get('/customers/:id', async (req, res, next) => {
    try {
      const { params } = await CustomerGetRequestSchema.parseAsync({ params: req.params });

      const response = await customerService.get({ params });

      res.status(HttpStatus.OK).json(response);
    } catch (e) {
      next(e);
    }
  });
}

const CustomerListRequestSchema = z
  .object({
    query: z
      .object({
        limit: LimitSchema,
        page: PageSchema,
        search: SearchSchema.optional(),
      })
      .strict(),
  })
  .strict();

export type CustomerListRequestDto = z.infer<typeof CustomerListRequestSchema>;

const CustomerGetRequestSchema = z
  .object({
    params: z
      .object({
        id: CustomerSchema.id,
      })
      .strict(),
  })
  .strict();

export type CustomerGetRequestDto = z.infer<typeof CustomerGetRequestSchema>;
