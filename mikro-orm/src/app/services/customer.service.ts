import { EntityRepository } from '@mikro-orm/postgresql';
import { NotFoundException } from '../../core/http-exception';
import { Customer } from '../entities/customer.entity';
import { CustomerGetRequestDto, CustomerListRequestDto } from '../routers/customer.router';

export class CustomerService {
  private static _instance: CustomerService;
  constructor(private readonly customerRepository: EntityRepository<Customer>) {
    if (CustomerService._instance) {
      return CustomerService._instance;
    }

    CustomerService._instance = this;
  }

  public async get(ctx: CustomerGetRequestDto): Promise<{
    customer: Omit<Customer, 'orders'>;
  }> {
    const { params } = ctx;

    const customer = await this.customerRepository.findOne({ id: params.id });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return { customer };
  }

  public async list(ctx: CustomerListRequestDto): Promise<{
    customers: Array<
      Pick<Customer, 'id' | 'contactTitle' | 'contactName' | 'companyName' | 'city' | 'country' | 'phone'>
    >;
    count: number;
  }> {
    const { query } = ctx;

    const [customers, count] = await this.customerRepository.findAndCount(
      query.search
        ? {
            $or: [
              { contactName: { $ilike: `%${query.search}%` } },
              { contactTitle: { $ilike: `%${query.search}%` } },
              { companyName: { $ilike: `%${query.search}%` } },
              { address: { $ilike: `%${query.search}%` } },
            ],
          }
        : {},
      {
        limit: query.limit,
        offset: query.page * query.limit,
        fields: ['id', 'contactTitle', 'contactName', 'companyName', 'city', 'country', 'phone'],
      },
    );

    return {
      customers,
      count,
    };
  }
}
