import { Employee } from '../entities/employee.entity';
import { EmployeeGetRequestDto, EmployeeListRequestDto } from '../routers/employee.router';
import { NotFoundException } from '../../core/http-exception';
import { EntityRepository } from '@mikro-orm/postgresql';

export class EmployeeService {
  private static _instance: EmployeeService;
  constructor(private readonly employeeRepository: EntityRepository<Employee>) {
    if (EmployeeService._instance) {
      return EmployeeService._instance;
    }

    EmployeeService._instance = this;
  }

  public async get(ctx: EmployeeGetRequestDto): Promise<{ employee: Employee }> {
    const { params } = ctx;

    const employee = await this.employeeRepository.findOne(
      { id: params.id },
      {
        populate: ['manager'],
        fields: ['*', 'manager.id', 'manager.firstName', 'manager.lastName'],
      },
    );
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return { employee };
  }

  public async list(ctx: EmployeeListRequestDto): Promise<{
    employees: Array<
      Pick<Employee, 'id' | 'title' | 'city' | 'country' | 'homePhone' | 'firstName' | 'lastName'>
    >;
    count: number;
  }> {
    const { query } = ctx;

    const [employees, count] = await this.employeeRepository.findAndCount(
      {},
      {
        offset: query.page * query.limit,
        limit: query.limit,
        fields: ['id', 'firstName', 'lastName', 'title', 'city', 'country', 'homePhone'],
      },
    );

    return {
      employees,
      count,
    };
  }
}
