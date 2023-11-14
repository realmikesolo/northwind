import { Product } from '../entities/product.entity';
import { ProductGetRequestDto, ProductListRequestDto } from '../routers/product.router';
import { NotFoundException } from '../../core/http-exception';
import { EntityRepository } from '@mikro-orm/postgresql';

export class ProductService {
  private static _instance: ProductService;
  constructor(private readonly productRepository: EntityRepository<Product>) {
    if (ProductService._instance) {
      return ProductService._instance;
    }

    ProductService._instance = this;
  }

  public async get(ctx: ProductGetRequestDto): Promise<{
    product: Product;
  }> {
    const { params } = ctx;

    const product = await this.productRepository.findOne({ id: params.id }, { populate: ['supplier'] });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return {
      product,
    };
  }

  public async list(ctx: ProductListRequestDto): Promise<{
    products: Product[];
    count: number;
  }> {
    const { query } = ctx;

    const [products, count] = await this.productRepository.findAndCount(
      query.search
        ? {
            name: { $ilike: `%${query.search}%` },
          }
        : {},
      {
        offset: query.page * query.limit,
        limit: query.limit,
        fields: ['name', 'quantityPerUnit', 'unitPrice', 'unitsInStock', 'unitsOnOrder'],
      },
    );

    return {
      products,
      count,
    };
  }
}
