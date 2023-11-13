import { EntityRepository } from '@mikro-orm/postgresql';
import { Router } from 'express';
import { z } from 'zod';
import { orm } from '../../core/db/db';
import { HttpStatus } from '../../core/http-status';
import { LimitSchema, PageSchema, SearchSchema } from '../../core/schemas';
import { Product } from '../entities/product.entity';
import { ProductSchema } from '../schemas/product.schema';
import { ProductService } from '../services/product.service';

export async function productRouter(router: Router): Promise<void> {
  const productService = new ProductService(new EntityRepository(orm.em.fork(), Product));

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
