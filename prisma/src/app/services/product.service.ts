import { ProductGetRequestDto, ProductListRequestDto } from '../routers/product.router';
import { NotFoundException } from '../../core/http-exception';
import { Prisma, PrismaClient, Product } from '@prisma/client';

export class ProductService {
  private static _instance: ProductService;
  constructor(private readonly prisma: PrismaClient) {
    if (ProductService._instance) {
      return ProductService._instance;
    }

    ProductService._instance = this;
  }

  public async get(ctx: ProductGetRequestDto): Promise<{
    product: Product;
  }> {
    const { params } = ctx;

    const product = await this.prisma.product.findUnique({
      where: { id: params.id },
      include: {
        supplier: {
          select: {
            companyName: true,
            id: true,
          },
        },
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return {
      product,
    };
  }

  public async list(ctx: ProductListRequestDto): Promise<{
    products: Array<Omit<Product, 'supplierId' | 'categoryId' | 'discontinued' | 'reorderLevel'>>;
    count: number;
  }> {
    const { query } = ctx;

    const whereOptions: Prisma.ProductWhereInput = query.search
      ? {
          name: { contains: query.search, mode: 'insensitive' },
        }
      : {};

    const [products, count] = await Promise.all([
      this.prisma.product.findMany({
        where: whereOptions,
        take: query.limit,
        skip: query.page * query.limit,
        select: {
          id: true,
          name: true,
          quantityPerUnit: true,
          unitPrice: true,
          unitsInStock: true,
          unitsOnOrder: true,
        },
      }),
      this.prisma.product.count({ where: whereOptions }),
    ]);

    return {
      products,
      count,
    };
  }
}
