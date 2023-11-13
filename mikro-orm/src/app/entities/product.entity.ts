import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Category } from './category.entity';
import { OrderDetail } from './order-detail.entity';
import { Supplier } from './supplier.entity';

@Entity({ tableName: 'products' })
export class Product {
  @PrimaryKey({ type: 'integer', autoincrement: true })
  public id: number;

  @Property({ type: 'text' })
  public name: string;

  @Property({ type: 'integer', fieldName: 'supplierId' })
  public supplierId: number;

  @Property({ type: 'integer', fieldName: 'categoryId' })
  public categoryId: number;

  @Property({ type: 'text', fieldName: 'quantityPerUnit' })
  public quantityPerUnit: string;

  @Property({ type: 'decimal', precision: 10, scale: 4, fieldName: 'unitPrice' })
  public unitPrice: number;

  @Property({ type: 'integer', fieldName: 'unitsInStock' })
  public unitsInStock: number;

  @Property({ type: 'integer', fieldName: 'unitsOnOrder' })
  public unitsOnOrder: number;

  @Property({ type: 'integer', fieldName: 'reorderLevel' })
  public reorderLevel: number;

  @Property({ type: 'boolean' })
  public discontinued: boolean;

  @ManyToOne(() => Category, { fieldName: 'categoryId', referenceColumnName: 'id' })
  public category: Category;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  public orderDetails = new Collection<OrderDetail>(this);

  @ManyToOne(() => Supplier, { fieldName: 'supplierId', referenceColumnName: 'id' })
  public supplier: Supplier;
}
