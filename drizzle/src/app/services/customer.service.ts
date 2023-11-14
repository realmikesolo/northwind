import { eq, ilike, or, sql } from 'drizzle-orm';
import { Drizzle } from '../../core/db/db';
import { NotFoundException } from '../../core/http-exception';
import { Customer, customers } from '../entities/customer.entity';
import { CustomerGetRequestDto, CustomerListRequestDto } from '../routers/customer.router';

export class CustomerService {
  private static _instance: CustomerService;
  constructor(private readonly drizzle: Drizzle) {
    if (CustomerService._instance) {
      return CustomerService._instance;
    }

    CustomerService._instance = this;
  }

  public async get(ctx: CustomerGetRequestDto): Promise<{ customer: Customer }> {
    const { params } = ctx;

    const customer = await this.drizzle
      .select()
      .from(customers)
      .where(eq(customers.id, params.id))
      .then((rows) => rows[0]);
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

    const whereOptions = query.search
      ? or(
          ilike(customers.contactName, `%${query.search}%`),
          ilike(customers.contactTitle, `%${query.search}%`),
          ilike(customers.companyName, `%${query.search}%`),
          ilike(customers.address, `%${query.search}%`),
        )
      : undefined;

    const [response, count] = await Promise.all([
      this.drizzle
        .select({
          id: customers.id,
          contactTitle: customers.contactTitle,
          contactName: customers.contactName,
          companyName: customers.companyName,
          city: customers.city,
          country: customers.country,
          phone: customers.phone,
        })
        .from(customers)
        .where(whereOptions)
        .offset(query.page * query.limit)
        .limit(query.limit),
      this.drizzle
        .select({ count: sql<number>`cast(count(${customers.id}) as integer)` })
        .from(customers)
        .where(whereOptions),
    ]);

    return {
      customers: response,
      count: count[0].count,
    };
  }
}
