import { Repository } from 'typeorm';
import { OrderDetail } from '../entities/order-detail.entity';
import { Order } from '../entities/order.entity';
import { OrderGetRequestDto, OrderListRequestDto } from '../routers/order.router';
import { NotFoundException } from '../../core/http-exception';

export class OrderService {
  private static _instance: OrderService;
  constructor(
    private readonly orderRepository: Repository<Order>,
    private readonly orderDetailsRepository: Repository<OrderDetail>,
  ) {
    if (OrderService._instance) {
      return OrderService._instance;
    }

    OrderService._instance = this;
  }

  public async get(ctx: OrderGetRequestDto): Promise<{
    order: Omit<
      Order,
      'employeeId' | 'shipAddress' | 'employee' | 'customer' | 'orderDetails' | 'shipper' | 'via'
    > & {
      totalPrice: number;
      totalQuantity: number;
      totalProducts: number;
      totalDiscount: number;
      shipVia: string;
    };
    products: Array<
      Pick<OrderDetail, 'discount' | 'quantity' | 'unitPrice'> & {
        totalPrice: number;
        name: string;
      }
    >;
  }> {
    const { params } = ctx;

    const orderQueryBuilder = this.orderRepository.createQueryBuilder('order');

    const order = await orderQueryBuilder
      .select([
        'order.id as id',
        'order.customerId as "customerId"',
        'order.shipName as "shipName"',
        'order.shipCity as "shipCity"',
        'order.freight as freight',
        'order.shipCountry as "shipCountry"',
        'order.orderDate as "orderDate"',
        'order.requiredDate as "requiredDate"',
        'order.shippedDate as "shippedDate"',
        'order.shipRegion as shipRegion',
        'order.shipPostalCode as "shipPostalCode"',
        'SUM(detail.unitPrice * detail.quantity)::float as "totalPrice"',
        'SUM(detail.quantity)::int as "totalQuantity"',
        'SUM(detail.quantity * detail.unitPrice * detail.discount)::float as "totalDiscount"',
        'COUNT(detail.orderId)::int as "totalProducts"',
        'shipper.companyName as "shipVia"',
      ])
      .where('order.id = :id', { id: params.id })
      .leftJoin('order.orderDetails', 'detail')
      .leftJoin('order.shipper', 'shipper')
      .groupBy('order.id')
      .addGroupBy('shipper.companyName')
      .getRawOne<
        Omit<
          Order,
          'employeeId' | 'shipAddress' | 'employee' | 'customer' | 'orderDetails' | 'shipper' | 'via'
        > & {
          totalPrice: number;
          totalQuantity: number;
          totalProducts: number;
          totalDiscount: number;
          shipVia: string;
        }
      >();
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const orderDetailsQueryBuilder = this.orderDetailsRepository.createQueryBuilder('detail');

    const products = await orderDetailsQueryBuilder
      .select([
        'CAST(detail.unitPrice as float)',
        'detail.quantity as quantity',
        'SUM(detail.unitPrice * detail.quantity)::float as "totalPrice"',
        'detail.discount as discount',
        'product.name as name',
      ])
      .where('detail.orderId = :id', { id: params.id })
      .leftJoin('detail.product', 'product')
      .groupBy('detail.unitPrice')
      .addGroupBy('detail.quantity')
      .addGroupBy('detail.discount')
      .addGroupBy('product.name')
      .getRawMany<
        Pick<OrderDetail, 'discount' | 'quantity' | 'unitPrice'> & {
          totalPrice: number;
          name: string;
        }
      >();

    return {
      order,
      products,
    };
  }

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
}
