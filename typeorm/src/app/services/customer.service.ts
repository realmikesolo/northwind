import { ILike, Repository } from 'typeorm';
import { NotFoundException } from '../../core/http-exception';
import { Customer } from '../entities/customer.entity';
import { CustomerGetRequestDto, CustomerListRequestDto } from '../routers/customer.router';

export class CustomerService {
  private static _instance: CustomerService;
  constructor(private readonly customerService: Repository<Customer>) {
    if (CustomerService._instance) {
      return CustomerService._instance;
    }

    CustomerService._instance = this;
  }

  public async get(ctx: CustomerGetRequestDto): Promise<{
    customer: Omit<Customer, 'orders'>;
  }> {
    const { params } = ctx;

    const customer = await this.customerService.findOne({
      where: { id: params.id },
    });
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

    const [customers, count] = await this.customerService.findAndCount({
      skip: query.page * query.limit,
      take: query.limit,
      where: [
        { contactName: ILike(`%${query.search}%`) },
        { contactTitle: ILike(`%${query.search}%`) },
        { companyName: ILike(`%${query.search}%`) },
        { address: ILike(`%${query.search}%`) },
      ],
      select: ['id', 'contactTitle', 'contactName', 'companyName', 'city', 'country', 'phone'],
    });

    return {
      customers,
      count,
    };
  }
}
