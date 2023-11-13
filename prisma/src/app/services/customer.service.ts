import { Customer, Prisma, PrismaClient } from '@prisma/client';
import { NotFoundException } from '../../core/http-exception';
import { CustomerGetRequestDto, CustomerListRequestDto } from '../routers/customer.router';

export class CustomerService {
  private static _instance: CustomerService;
  constructor(private readonly prisma: PrismaClient) {
    if (CustomerService._instance) {
      return CustomerService._instance;
    }

    CustomerService._instance = this;
  }

  public async get(ctx: CustomerGetRequestDto): Promise<{ customer: Customer }> {
    const { params } = ctx;

    const customer = await this.prisma.customer.findUnique({ where: { id: params.id } });
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

    const whereOptions: Prisma.CustomerWhereInput = query.search
      ? {
          OR: [
            { contactName: { contains: query.search, mode: 'insensitive' } },
            { contactTitle: { contains: query.search, mode: 'insensitive' } },
            { companyName: { contains: query.search, mode: 'insensitive' } },
            { address: { contains: query.search, mode: 'insensitive' } },
          ],
        }
      : {};

    const [customers, count] = await Promise.all([
      this.prisma.customer.findMany({
        select: {
          id: true,
          contactTitle: true,
          contactName: true,
          companyName: true,
          city: true,
          country: true,
          phone: true,
        },
        skip: query.page * query.limit,
        take: query.limit,
        where: whereOptions,
      }),
      this.prisma.customer.count({ where: whereOptions }),
    ]);

    return {
      customers,
      count,
    };
  }
}
