import { eq, sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { Drizzle } from '../../core/db/db';
import { NotFoundException } from '../../core/http-exception';
import { Employee, employees } from '../entities/employee.entity';
import { EmployeeGetRequestDto, EmployeeListRequestDto } from '../routers/employee.router';

export class EmployeeService {
  private static _instance: EmployeeService;
  constructor(private readonly drizzle: Drizzle) {
    if (EmployeeService._instance) {
      return EmployeeService._instance;
    }

    EmployeeService._instance = this;
  }

  public async get(ctx: EmployeeGetRequestDto): Promise<{
    employee: Employee;
    manager: Pick<Employee, 'id' | 'firstName' | 'lastName'> | null;
  }> {
    const { params } = ctx;

    const manager = alias(employees, 'manager');

    const employee = await this.drizzle
      .select({
        employee: { ...employees },
        manager: {
          id: manager.id,
          firstName: manager.firstName,
          lastName: manager.lastName,
        },
      })
      .from(employees)
      .where(eq(employees.id, params.id))
      .leftJoin(manager, eq(manager.id, employees.reportsTo))
      .then((rows) => rows[0]);
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }

  public async list(ctx: EmployeeListRequestDto): Promise<{
    employees: Array<
      Pick<Employee, 'id' | 'firstName' | 'lastName' | 'title' | 'city' | 'country' | 'homePhone'>
    >;
    count: number;
  }> {
    const { query } = ctx;

    const [response, count] = await Promise.all([
      this.drizzle
        .select({
          id: employees.id,
          firstName: employees.firstName,
          lastName: employees.lastName,
          title: employees.title,
          city: employees.city,
          country: employees.country,
          homePhone: employees.homePhone,
        })
        .from(employees)
        .offset(query.page * query.limit)
        .limit(query.limit),
      this.drizzle.select({ count: sql<number>`cast(count(${employees.id}) as integer)` }).from(employees),
    ]);

    return {
      employees: response,
      count: count[0].count,
    };
  }
}
