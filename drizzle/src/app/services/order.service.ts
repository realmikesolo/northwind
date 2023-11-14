import { eq, sql } from 'drizzle-orm';
import { orderDetails } from '../entities/order-detail.entity';
import { Order, orders } from '../entities/order.entity';
import { shippers } from '../entities/shipper.entity';
import { OrderGetRequestDto, OrderListRequestDto } from '../routers/order.router';
import { Drizzle } from '../../core/db/db';
import { NotFoundException } from '../../core/http-exception';
import { products } from '../entities';

export class OrderService {
  constructor(private readonly drizzle: Drizzle) {}

  public async get(ctx: OrderGetRequestDto): Promise<{
    order: Omit<Order, 'employeeId' | 'shipAddress' | 'orderDate' | 'requiredDate' | 'shipVia'> & {
      totalPrice: number;
      totalQuantity: number;
      totalProducts: number;
      totalDiscount: number;
      shipperCompanyName: string | null;
    };
    products: Array<{
      unitPrice: number;
      quantity: number;
      totalPrice: number;
      discount: number;
      product: string | null;
    }>;
  }> {
    const { params } = ctx;

    const order = await this.drizzle
      .select({
        id: orders.id,
        customerId: orders.customerId,
        shipName: orders.shipName,
        shipCity: orders.shipCity,
        freight: orders.freight,
        shipCountry: orders.shipCountry,
        shippedDate: orders.shippedDate,
        shipRegion: orders.shipRegion,
        shipPostalCode: orders.shipPostalCode,
        totalProducts: sql<number>`cast(count(${orderDetails.productId}) as int)`,
        totalQuantity: sql<number>`cast(sum(${orderDetails.quantity}) as int)`,
        totalDiscount: sql<number>`sum(${orderDetails.quantity} * ${orderDetails.unitPrice} * ${orderDetails.discount})`,
        totalPrice: sql<number>`cast(sum(${orderDetails.quantity} * ${orderDetails.unitPrice}) as float)`,
        shipperCompanyName: shippers.companyName,
      })
      .from(orders)
      .where(eq(orders.id, params.id))
      .leftJoin(orderDetails, eq(orders.id, orderDetails.orderId))
      .leftJoin(shippers, eq(orders.shipVia, shippers.id))
      .groupBy(orders.id, shippers.companyName)
      .then((rows) => rows[0]);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const orderWithProducts = await this.drizzle
      .select({
        unitPrice: sql<number>`cast(${orderDetails.unitPrice} as float)`,
        quantity: orderDetails.quantity,
        totalPrice: sql<number>`cast(sum(${orderDetails.quantity} * ${orderDetails.unitPrice}) as float)`,
        discount: orderDetails.discount,
        product: products.name,
      })
      .from(orderDetails)
      .where(eq(orderDetails.orderId, params.id))
      .leftJoin(products, eq(orderDetails.productId, products.id))
      .groupBy(orderDetails.unitPrice, orderDetails.quantity, orderDetails.discount, products.name);

    return { order, products: orderWithProducts };
  }

  public async list(ctx: OrderListRequestDto): Promise<{
    orders: Array<
      Pick<Order, 'id' | 'shippedDate' | 'shipName' | 'shipCity' | 'shipCountry'> & {
        totalPrice: number;
        totalQuantity: number;
        totalProducts: number;
      }
    >;
    count: number;
  }> {
    const { query } = ctx;

    const [response, count] = await Promise.all([
      this.drizzle
        .select({
          id: orders.id,
          shippedDate: orders.shippedDate,
          shipName: orders.shipName,
          shipCity: orders.shipCity,
          shipCountry: orders.shipCountry,
          totalProducts: sql<number>`cast(count(${orderDetails.productId}) as int)`,
          totalQuantity: sql<number>`cast(sum(${orderDetails.quantity}) as int)`,
          totalPrice: sql<number>`cast(sum(${orderDetails.quantity} * ${orderDetails.unitPrice}) as float)`,
        })
        .from(orders)
        .leftJoin(orderDetails, eq(orders.id, orderDetails.orderId))
        .groupBy(orders.id)
        .offset(query.page * query.limit)
        .limit(query.limit),
      this.drizzle.select({ count: sql<number>`cast(count(${orders.id}) as integer)` }).from(orders),
    ]);

    return {
      orders: response,
      count: count[0].count,
    };
  }
}
