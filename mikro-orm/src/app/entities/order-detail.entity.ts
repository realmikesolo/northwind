import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity({ tableName: 'order-details' })
export class OrderDetail {
  @PrimaryKey({ type: 'integer', fieldName: 'orderId' })
  public orderId: number;

  @PrimaryKey({ type: 'integer', fieldName: 'productId' })
  public productId: number;

  @Property({ type: 'decimal', precision: 10, scale: 4, fieldName: 'unitPrice' })
  public unitPrice: number;

  @Property({ type: 'integer' })
  public quantity: number;

  @Property({ type: 'real' })
  public discount: number;

  @ManyToOne(() => Order, { fieldName: 'orderId', referenceColumnName: 'id' })
  public order: Order;

  @ManyToOne(() => Product, { fieldName: 'productId', referenceColumnName: 'id' })
  public product: Product;
}
