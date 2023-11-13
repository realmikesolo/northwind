import { Order, OrderDetail, PrismaClient } from '@prisma/client';
import { NotFoundException } from '../../core/http-exception';
import { OrderGetRequestDto, OrderListRequestDto } from '../routers/order.router';

export class OrderService {
  constructor(private readonly prisma: PrismaClient) {}

  public async get(ctx: OrderGetRequestDto): Promise<{
    order: Order & {
      totalPrice: number;
      totalDiscount: number;
      totalQuantity: number | null;
      totalProducts: number;
      orderDetails: Array<
        Omit<OrderDetail, 'productId' | 'orderId'> & { product: string; totalPrice: number }
      >;
      shipper: string;
    };
  }> {
    const { params } = ctx;

    const order = await this.prisma.order.findUnique({
      where: { id: params.id },
      include: {
        orderDetails: {
          select: {
            unitPrice: true,
            quantity: true,
            discount: true,
            product: {
              select: {
                name: true,
              },
            },
          },
        },
        shipper: {
          select: {
            companyName: true,
          },
        },
      },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const { _count, _sum } = await this.prisma.orderDetail.aggregate({
      where: { orderId: params.id },
      _sum: {
        quantity: true,
      },
      _count: {
        orderId: true,
      },
    });

    return {
      order: {
        ...order,
        totalPrice: order.orderDetails.reduce((acc, val) => acc + Number(val.unitPrice) * val.quantity, 0),
        totalDiscount: order.orderDetails.reduce(
          (acc, val) => acc + Number(val.unitPrice) * val.quantity * val.discount,
          0,
        ),
        totalQuantity: _sum?.quantity,
        totalProducts: _count?.orderId,
        orderDetails: order.orderDetails.map((detail) => ({
          ...detail,
          totalPrice: Number(detail.unitPrice) * detail.quantity,
          product: detail.product.name,
        })),
        shipper: order.shipper.companyName,
      },
    };
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

    const [orders, count] = await Promise.all([
      this.prisma.order.findMany({
        select: {
          id: true,
          shippedDate: true,
          shipName: true,
          shipCity: true,
          shipCountry: true,
          orderDetails: {
            select: {
              orderId: true,
              unitPrice: true,
              quantity: true,
            },
          },
        },
        take: query.limit,
        skip: query.page * query.limit,
      }),
      this.prisma.order.count(),
    ]);

    return {
      orders: orders.map((order) => ({
        ...order,
        totalPrice: order.orderDetails.reduce((acc, val) => acc + val.quantity * Number(val.unitPrice), 0),
        totalQuantity: order.orderDetails.reduce((acc, val) => acc + val.quantity, 0),
        totalProducts: order.orderDetails.length,
      })),
      count,
    };
  }
}
