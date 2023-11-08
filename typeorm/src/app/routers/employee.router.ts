import { Router } from 'express';
import { Repository } from 'typeorm';
import { z } from 'zod';
import dataSource from '../../core/db/typeorm.config';
import { HttpStatus } from '../../core/http-status';
import { LimitSchema, PageSchema } from '../../core/schemas';
import { Employee } from '../entities/employee.entity';
import { EmployeeSchema } from '../schemas/employee.schema';
import { EmployeeService } from '../services/employee.service';

const employeeService = new EmployeeService(new Repository(Employee, dataSource.manager));

export async function employeeRouter(router: Router): Promise<void> {
  router.get('/employees', async (req, res, next) => {
    try {
      const { query } = await EmployeeListRequestSchema.parseAsync({ query: req.query });

      const response = await employeeService.list({ query });

      res.status(HttpStatus.OK).json(response);
    } catch (e) {
      next(e);
    }
  });

  router.get('/employees/:id', async (req, res, next) => {
    try {
      const { params } = await EmployeeGetRequestSchema.parseAsync({ params: req.params });

      const response = await employeeService.get({ params });

      res.status(HttpStatus.OK).json(response);
    } catch (e) {
      next(e);
    }
  });
}

const EmployeeListRequestSchema = z
  .object({
    query: z
      .object({
        limit: LimitSchema,
        page: PageSchema,
      })
      .strict(),
  })
  .strict();

export type EmployeeListRequestDto = z.infer<typeof EmployeeListRequestSchema>;

const EmployeeGetRequestSchema = z
  .object({
    params: z
      .object({
        id: EmployeeSchema.id,
      })
      .strict(),
  })
  .strict();

export type EmployeeGetRequestDto = z.infer<typeof EmployeeGetRequestSchema>;
