import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';
import { OrderDetail } from './order-detail.entity';
import { Supplier } from './supplier.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'text' })
  public name: string;

  @Column({ type: 'integer' })
  public supplierId: number;

  @Column({ type: 'integer' })
  public categoryId: number;

  @Column({ type: 'text' })
  public quantityPerUnit: string;

  @Column({ type: 'decimal', precision: 10, scale: 4 })
  public unitPrice: number;

  @Column({ type: 'integer' })
  public unitsInStock: number;

  @Column({ type: 'integer' })
  public unitsOnOrder: number;

  @Column({ type: 'integer' })
  public reorderLevel: number;

  @Column({ type: 'boolean' })
  public discontinued: boolean;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryId', referencedColumnName: 'id' })
  public category: Category;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  public orderDetails: OrderDetail[];

  @ManyToOne(() => Supplier, (supplier) => supplier.products)
  @JoinColumn({ name: 'supplierId', referencedColumnName: 'id' })
  public supplier: Supplier;
}
