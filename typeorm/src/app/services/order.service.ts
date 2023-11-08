import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderGetRequestDto, OrderListRequestDto } from '../routers/order.router';
import { NotFoundException } from '../../core/http-exception';

export class OrderService {
  constructor(private readonly orderRepository: Repository<Order>) {}

  public async list(ctx: OrderListRequestDto): Promise<
    Array<
      Pick<Order, 'id' | 'shippedDate' | 'shipName' | 'shipCity' | 'shipCountry'> & {
        totalPrice: number;
        totalQuantity: number;
        totalProducts: number;
      }
    >
  > {
    const { query } = ctx;

    const queryBuilder = this.orderRepository.createQueryBuilder('order');

    const orders = await queryBuilder
      .select([
        'id',
        'order.shippedDate as "shippedDate"',
        'order.shipName as "shipName"',
        'order.shipCity as "shipCity"',
        'order.shipCountry as "shipCountry"',
        'SUM(detail.unitPrice * detail.quantity)::float as "totalPrice"',
        'SUM(detail.quantity)::int as "totalQuantity"',
        'COUNT(detail.orderId)::int as "totalProducts"',
      ])
      .leftJoin('order.orderDetails', 'detail')
      .groupBy('order.id')
      .limit(query.limit)
      .offset(query.page * query.limit)
      .getRawMany<
        Pick<Order, 'id' | 'shippedDate' | 'shipName' | 'shipCity' | 'shipCountry'> & {
          totalPrice: number;
          totalQuantity: number;
          totalProducts: number;
        }
      >();

    return orders;
  }

  public async get(ctx: OrderGetRequestDto): Promise<
    Omit<
      Order,
      'shipVia' | 'shipAddress' | 'employeeId' | 'orderDetails' | 'employee' | 'shipper' | 'customer'
    > & {
      shipVia: string;
      products: Array<{
        name: string;
        quantity: number;
        unitPrice: number;
        discount: number;
      }>;
      totalProducts: number;
      totalQuantity: number;
      totalPrice: number;
      totalDiscount: number;
    }
  > {
    const { params } = ctx;

    const order = await this.orderRepository.findOne({
      where: { id: params.id },
      relations: ['orderDetails.product', 'shipper'],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return {
      id: order.id,
      customerId: order.customerId,
      shipName: order.shipName,
      shipCity: order.shipCity,
      shipCountry: order.shipCountry,
      shipRegion: order.shipRegion,
      shipPostalCode: order.shipPostalCode,
      orderDate: order.orderDate,
      requiredDate: order.requiredDate,
      shippedDate: order.shippedDate,
      freight: order.freight,
      shipVia: order.shipper.companyName,
      products: order.orderDetails.map((detail) => ({
        name: detail.product.name,
        quantity: detail.quantity,
        unitPrice: detail.unitPrice,
        discount: detail.discount,
      })),
      ...order.orderDetails.reduce(
        (acc, val) => {
          acc.totalPrice += val.unitPrice * val.quantity;
          acc.totalQuantity += val.quantity;
          acc.totalProducts += 1;
          acc.totalDiscount += val.unitPrice * val.quantity * val.discount;
          return acc;
        },
        {
          totalProducts: 0,
          totalQuantity: 0,
          totalPrice: 0,
          totalDiscount: 0,
        },
      ),
    };
  }
}
