import { Router } from 'express';
import { z } from 'zod';
import { HttpStatus } from '../../core/http-status';
import { LimitSchema, PageSchema, SearchSchema } from '../../core/schemas';
import { ProductSchema } from '../schemas/product.schema';
import { ProductService } from '../services/product.service';
import { db } from '../../core/db/db';

export async function productRouter(router: Router): Promise<void> {
  const productService = new ProductService(db);

  router.get('/products', async (req, res, next) => {
    try {
      const { query } = await ProductListRequestSchema.parseAsync({ query: req.query });

      const response = await productService.list({ query });

      res.status(HttpStatus.OK).json(response);
    } catch (e) {
      next(e);
    }
  });

  router.get('/products/:id', async (req, res, next) => {
    try {
      const { params } = await ProductGetRequestSchema.parseAsync({ params: req.params });

      const response = await productService.get({ params });

      res.status(HttpStatus.OK).json(response);
    } catch (e) {
      next(e);
    }
  });
}

const ProductListRequestSchema = z
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

export type ProductListRequestDto = z.infer<typeof ProductListRequestSchema>;

const ProductGetRequestSchema = z
  .object({
    params: z
      .object({
        id: ProductSchema.id,
      })
      .strict(),
  })
  .strict();

export type ProductGetRequestDto = z.infer<typeof ProductGetRequestSchema>;
