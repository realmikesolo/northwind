import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { EmployeeGetRequestDto, EmployeeListRequestDto } from '../routers/employee.router';
import { NotFoundException } from '../../core/http-exception';

export class EmployeeService {
  constructor(private readonly employeeRepository: Repository<Employee>) {}

  public async list(ctx: EmployeeListRequestDto): Promise<{
    employees: Array<Pick<Employee, 'id' | 'title' | 'city' | 'country' | 'homePhone'> & { name: string }>;
    count: number;
  }> {
    const { query } = ctx;

    const [employees, count] = await this.employeeRepository.findAndCount({
      skip: query.page * query.limit,
      take: query.limit,
      select: ['id', 'firstName', 'lastName', 'title', 'city', 'country', 'homePhone'],
    });

    return {
      employees: employees.map((employee) => ({
        id: employee.id,
        name: `${employee.firstName} ${employee.lastName}`,
        title: employee.title,
        city: employee.city,
        country: employee.country,
        homePhone: employee.homePhone,
      })),
      count,
    };
  }

  public async get(ctx: EmployeeGetRequestDto): Promise<{
    employee: Omit<
      Employee,
      'manager' | 'reportsTo' | 'employeeTerritories' | 'orders' | 'subordinates' | 'firstName' | 'lastName'
    > & {
      name: string;
      manager: {
        id: number;
        name: string;
      };
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
        id: employee.id,
        name: `${employee.lastName} ${employee.firstName}`,
        title: employee.title,
        titleOfCourtesy: employee.titleOfCourtesy,
        birthDate: employee.birthDate,
        hireDate: employee.hireDate,
        address: employee.address,
        city: employee.city,
        region: employee.region,
        postalCode: employee.postalCode,
        country: employee.country,
        homePhone: employee.homePhone,
        extension: employee.extension,
        notes: employee.notes,
        manager: {
          id: employee.manager.id,
          name: `${employee.manager.lastName} ${employee.manager.firstName}`,
        },
      },
    };
  }
}
