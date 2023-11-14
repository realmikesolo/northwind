import { eq, sql } from 'drizzle-orm';
import { Drizzle } from '../../core/db/db';
import { Supplier, suppliers } from '../entities';
import { SupplierGetRequestDto, SupplierListRequestDto } from '../routers/supplier.router';
import { NotFoundException } from '../../core/http-exception';

export class SupplierService {
  private static _instance: SupplierService;
  constructor(private readonly drizzle: Drizzle) {
    if (SupplierService._instance) {
      return SupplierService._instance;
    }

    SupplierService._instance = this;
  }

  public async get(ctx: SupplierGetRequestDto): Promise<{
    supplier: Supplier;
  }> {
    const { params } = ctx;

    const supplier = await this.drizzle
      .select()
      .from(suppliers)
      .where(eq(suppliers.id, params.id))
      .then((rows) => rows[0]);
    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    return {
      supplier,
    };
  }

  public async list(ctx: SupplierListRequestDto): Promise<{
    suppliers: Array<
      Pick<Supplier, 'id' | 'companyName' | 'contactName' | 'contactTitle' | 'city' | 'country'>
    >;
    count: number;
  }> {
    const { query } = ctx;

    const [response, count] = await Promise.all([
      this.drizzle
        .select({
          id: suppliers.id,
          companyName: suppliers.companyName,
          contactName: suppliers.contactName,
          contactTitle: suppliers.contactTitle,
          city: suppliers.city,
          country: suppliers.country,
        })
        .from(suppliers)
        .offset(query.page * query.limit)
        .limit(query.limit),
      this.drizzle
        .select({
          count: sql<number>`cast(count(${suppliers.id}) as integer)`,
        })
        .from(suppliers),
    ]);

    return {
      suppliers: response,
      count: count[0].count,
    };
  }
}
