import { eq, ilike, sql } from 'drizzle-orm';
import { Drizzle } from '../../core/db/db';
import { ProductGetRequestDto, ProductListRequestDto } from '../routers/product.router';
import { Product, Supplier, products, suppliers } from '../entities';
import { NotFoundException } from '../../core/http-exception';

export class ProductService {
  private static _instance: ProductService;
  constructor(private readonly drizzle: Drizzle) {
    if (ProductService._instance) {
      return ProductService._instance;
    }

    ProductService._instance = this;
  }

  public async get(ctx: ProductGetRequestDto): Promise<{
    product: Product;
    supplier: Pick<Supplier, 'id' | 'companyName'> | null;
  }> {
    const { params } = ctx;

    const product = await this.drizzle
      .select({
        product: products,
        supplier: {
          id: suppliers.id,
          companyName: suppliers.companyName,
        },
      })
      .from(products)
      .where(eq(products.id, params.id))
      .leftJoin(suppliers, eq(suppliers.id, products.supplierId))
      .then((rows) => rows[0]);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  public async list(ctx: ProductListRequestDto): Promise<{
    products: Array<
      Pick<Product, 'id' | 'name' | 'quantityPerUnit' | 'unitPrice' | 'unitsInStock' | 'unitsOnOrder'>
    >;
    count: number;
  }> {
    const { query } = ctx;

    const whereOptions = query.search ? ilike(products.name, `%${query.search}%`) : undefined;

    const [response, count] = await Promise.all([
      this.drizzle
        .select({
          id: products.id,
          name: products.name,
          quantityPerUnit: products.quantityPerUnit,
          unitPrice: products.unitPrice,
          unitsInStock: products.unitsInStock,
          unitsOnOrder: products.unitsOnOrder,
        })
        .from(products)
        .where(whereOptions)
        .offset(query.page * query.limit)
        .limit(query.limit),
      this.drizzle
        .select({ count: sql<number>`cast(count(${products.id}) as integer)` })
        .from(products)
        .where(whereOptions),
    ]);

    return {
      products: response,
      count: count[0].count,
    };
  }
}
