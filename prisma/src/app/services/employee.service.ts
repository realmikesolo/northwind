import { EmployeeGetRequestDto, EmployeeListRequestDto } from '../routers/employee.router';
import { NotFoundException } from '../../core/http-exception';
import { Employee, PrismaClient } from '@prisma/client';

export class EmployeeService {
  private static _instance: EmployeeService;
  constructor(private readonly prisma: PrismaClient) {
    if (EmployeeService._instance) {
      return EmployeeService._instance;
    }

    EmployeeService._instance = this;
  }

  public async get(ctx: EmployeeGetRequestDto): Promise<{ employee: Employee }> {
    const { params } = ctx;

    const employee = await this.prisma.employee.findUnique({
      where: { id: params.id },
      include: {
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return { employee };
  }

  public async list(ctx: EmployeeListRequestDto): Promise<{
    employees: Array<
      Pick<Employee, 'id' | 'firstName' | 'lastName' | 'title' | 'city' | 'country' | 'homePhone'>
    >;
    count: number;
  }> {
    const { query } = ctx;

    const [employees, count] = await Promise.all([
      this.prisma.employee.findMany({
        skip: query.page * query.limit,
        take: query.limit,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          title: true,
          city: true,
          country: true,
          homePhone: true,
        },
      }),
      this.prisma.employee.count(),
    ]);

    return {
      employees,
      count,
    };
  }
}
