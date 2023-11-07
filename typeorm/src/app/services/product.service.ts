import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { ProductGetRequestDto, ProductListRequestDto } from '../routers/product.router';
import { NotFoundException } from '../../core/http-exception';

export class ProductService {
  constructor(private readonly productRepository: Repository<Product>) {}

  public async list(ctx: ProductListRequestDto): Promise<{
    products: Product[];
    count: number;
  }> {
    const { query } = ctx;

    const [products, count] = await this.productRepository.findAndCount({
      skip: query.page * query.limit,
      take: query.limit,
      select: ['name', 'quantityPerUnit', 'unitPrice', 'unitsInStock', 'unitsOnOrder'],
    });

    return {
      products,
      count,
    };
  }

  public async get(ctx: ProductGetRequestDto): Promise<{
    product: Product;
  }> {
    const { params } = ctx;

    const product = await this.productRepository.findOne({
      where: { id: params.id },
      relations: ['supplier'],
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return {
      product,
    };
  }
}
