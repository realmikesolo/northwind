import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { EmployeeGetRequestDto, EmployeeListRequestDto } from '../routers/employee.router';
import { NotFoundException } from '../../core/http-exception';

export class EmployeeService {
  constructor(private readonly employeeRepository: Repository<Employee>) {}

  public async get(ctx: EmployeeGetRequestDto): Promise<{
    employee: Omit<Employee, 'manager' | 'reportsTo' | 'employeeTerritories' | 'orders' | 'subordinates'> & {
      manager: Pick<Employee, 'id' | 'firstName' | 'lastName'>;
    };
  }> {
    const { params } = ctx;

    const employee = await this.employeeRepository.findOne({
      where: { id: params.id },
      relations: ['manager'],
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return {
      employee: {
        ...employee,
        manager: {
          id: employee.manager.id,
          firstName: employee.manager.firstName,
          lastName: employee.manager.lastName,
        },
      },
    };
  }

  public async list(ctx: EmployeeListRequestDto): Promise<{
    employees: Array<
      Pick<Employee, 'id' | 'title' | 'city' | 'country' | 'homePhone' | 'firstName' | 'lastName'>
    >;
    count: number;
  }> {
    const { query } = ctx;

    const [employees, count] = await this.employeeRepository.findAndCount({
      skip: query.page * query.limit,
      take: query.limit,
      select: ['id', 'firstName', 'lastName', 'title', 'city', 'country', 'homePhone'],
    });

    return {
      employees,
      count,
    };
  }
}
