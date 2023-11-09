import { Repository } from 'typeorm';
import { Supplier } from '../entities/supplier.entity';
import { SupplierGetRequestDto, SupplierListRequestDto } from '../routers/supplier.router';
import { NotFoundException } from '../../core/http-exception';

export class SupplierService {
  constructor(private readonly supplierRepository: Repository<Supplier>) {}

  public async get(ctx: SupplierGetRequestDto): Promise<{
    supplier: Supplier;
  }> {
    const { params } = ctx;

    const supplier = await this.supplierRepository.findOneBy({ id: params.id });
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

    const [suppliers, count] = await this.supplierRepository.findAndCount({
      skip: query.page * query.limit,
      take: query.limit,
      select: ['companyName', 'contactName', 'contactTitle', 'city', 'country'],
    });

    return {
      suppliers,
      count,
    };
  }
}
