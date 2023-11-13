import { Router } from 'express';
import { OrderService } from '../services/order.service';
import { z } from 'zod';
import { LimitSchema, PageSchema } from '../../core/schemas';
import { HttpStatus } from '../../core/http-status';
import { OrderSchema } from '../schemas/order.schema';
import { prisma } from '../../core/db/db';

export async function orderRouter(router: Router): Promise<void> {
  const productService = new OrderService(prisma);

  router.get('/orders', async (req, res, next) => {
    try {
      const { query } = await OrderListRequestSchema.parseAsync({ query: req.query });

      const response = await productService.list({ query });

      res.status(HttpStatus.OK).json(response);
    } catch (e) {
      next(e);
    }
  });

  router.get('/orders/:id', async (req, res, next) => {
    try {
      const { params } = await OrderGetRequestSchema.parseAsync({ params: req.params });

      const response = await productService.get({ params });

      res.status(HttpStatus.OK).json(response);
    } catch (e) {
      next(e);
    }
  });
}

const OrderListRequestSchema = z
  .object({
    query: z
      .object({
        limit: LimitSchema,
        page: PageSchema,
      })
      .strict(),
  })
  .strict();

export type OrderListRequestDto = z.infer<typeof OrderListRequestSchema>;

const OrderGetRequestSchema = z
  .object({
    params: z
      .object({
        id: OrderSchema.id,
      })
      .strict(),
  })
  .strict();

export type OrderGetRequestDto = z.infer<typeof OrderGetRequestSchema>;
