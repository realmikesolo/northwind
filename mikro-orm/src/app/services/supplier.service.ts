import { Supplier } from '../entities/supplier.entity';
import { SupplierGetRequestDto, SupplierListRequestDto } from '../routers/supplier.router';
import { NotFoundException } from '../../core/http-exception';
import { EntityRepository } from '@mikro-orm/postgresql';

export class SupplierService {
  constructor(private readonly supplierRepository: EntityRepository<Supplier>) {}

  public async get(ctx: SupplierGetRequestDto): Promise<{
    supplier: Supplier;
  }> {
    const { params } = ctx;

    const supplier = await this.supplierRepository.findOne({ id: params.id });
    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    return {
      supplier,
    };
  }

  public async list(ctx: SupplierListRequestDto): Promise<{
    suppliers: Supplier[];
    count: number;
  }> {
    const { query } = ctx;

    const [suppliers, count] = await this.supplierRepository.findAndCount(
      {},
      {
        offset: query.page * query.limit,
        limit: query.limit,
        fields: ['companyName', 'contactName', 'contactTitle', 'city', 'country'],
      },
    );

    return {
      suppliers,
      count,
    };
  }
}
