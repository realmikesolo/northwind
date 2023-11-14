import { SupplierGetRequestDto, SupplierListRequestDto } from '../routers/supplier.router';
import { NotFoundException } from '../../core/http-exception';
import { PrismaClient, Supplier } from '@prisma/client';

export class SupplierService {
  private static _instance: SupplierService;
  constructor(private readonly prisma: PrismaClient) {
    if (SupplierService._instance) {
      return SupplierService._instance;
    }

    SupplierService._instance = this;
  }

  public async get(ctx: SupplierGetRequestDto): Promise<{ supplier: Supplier }> {
    const { params } = ctx;

    const supplier = await this.prisma.supplier.findUnique({ where: { id: params.id } });
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

    const [suppliers, count] = await Promise.all([
      this.prisma.supplier.findMany({
        skip: query.page * query.limit,
        take: query.limit,
        select: {
          id: true,
          companyName: true,
          contactName: true,
          contactTitle: true,
          city: true,
          country: true,
        },
      }),
      this.prisma.supplier.count(),
    ]);

    return {
      suppliers,
      count,
    };
  }
}
