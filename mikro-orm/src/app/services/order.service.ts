import { EntityRepository } from '@mikro-orm/postgresql';
import { NotFoundException } from '../../core/http-exception';
import { OrderDetail } from '../entities/order-detail.entity';
import { Order } from '../entities/order.entity';
import { OrderGetRequestDto, OrderListRequestDto } from '../routers/order.router';

export class OrderService {
  constructor(
    private readonly orderRepository: EntityRepository<Order>,
    private readonly orderDetailsRepository: EntityRepository<OrderDetail>,
  ) {}

  public async get(ctx: OrderGetRequestDto): Promise<{
    order: Order;
    products: OrderDetail[];
  }> {
    const { params } = ctx;

    const queryBuilder = this.orderRepository.createQueryBuilder('order');

    const order = await queryBuilder
      .select([
        'id',
        'customerId',
        'shipName',
        'shipCity',
        'freight',
        'shipCountry',
        'orderDate',
        'requiredDate',
        'shippedDate',
        'shipRegion',
        'shipPostalCode',
      ])
      .addSelect([
        'SUM(detail."unitPrice" * detail.quantity)::float as "totalPrice"',
        'SUM(detail.quantity)::int as "totalQuantity"',
        'SUM(detail.quantity * detail."unitPrice" * detail.discount)::float as "totalDiscount"',
        'COUNT(detail."orderId")::int as "totalProducts"',
      ])
      .addSelect('shipper."companyName" as "shipVia"')
      .where({ id: params.id })
      .leftJoin('order.orderDetails', 'detail')
      .leftJoin('order.shipper', 'shipper')
      .groupBy(['order.id', 'shipper.companyName'])
      .getSingleResult();
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const orderDetailQueryBuilder = this.orderDetailsRepository.createQueryBuilder('detail');

    const products = await orderDetailQueryBuilder
      .select([
        'orderId',
        'productId',
        'CAST(detail."unitPrice" as float)',
        'detail.quantity as quantity',
        'SUM(detail."unitPrice" * detail.quantity)::float as "totalPrice"',
        'detail.discount as discount',
        'product.name as name',
      ])
      .where({ orderId: order.id })
      .leftJoin('detail.product', 'product')
      .groupBy([
        'detail.productId',
        'detail.orderId',
        'detail.unitPrice',
        'detail.quantity',
        'detail.discount',
        'product.name',
      ])
      .getResultList();

    return {
      order,
      products,
    };
  }

  public async list(ctx: OrderListRequestDto): Promise<{
    orders: Order[];
    count: number;
  }> {
    const { query } = ctx;

    const queryBuilder = this.orderRepository.createQueryBuilder('orderTable');

    const [count, orders] = await Promise.all([
      queryBuilder.getCount(),
      queryBuilder
        .select([
          '"orderTable".id',
          '"orderTable"."shippedDate" as "shippedDate"',
          '"orderTable"."shipName" as "shipName"',
          '"orderTable"."shipCity" as "shipCity"',
          '"orderTable"."shipCountry" as "shipCountry"',
          'SUM(detail."unitPrice" * detail.quantity)::float as "totalPrice"',
          'SUM(detail.quantity)::int as "totalQuantity"',
          'COUNT(detail."orderId")::int as "totalProducts"',
        ])
        .leftJoin('orderTable.orderDetails', 'detail')
        .groupBy('orderTable.id')
        .limit(query.limit)
        .offset(query.page * query.limit)
        .getResultList(),
    ]);

    return { orders, count };
  }
}
