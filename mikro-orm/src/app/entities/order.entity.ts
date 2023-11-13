import { Employee } from './employee.entity';
import { Customer } from './customer.entity';
import { OrderDetail } from './order-detail.entity';
import { Shipper } from './shipper.entity';
import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'orders' })
export class Order {
  @PrimaryKey({ type: 'integer', autoincrement: true })
  public id: number;

  @Property({ type: 'integer', fieldName: 'employeeId' })
  public employeeId: number;

  @Property({ type: 'text', fieldName: 'customerId' })
  public customerId: string;

  @Property({ type: 'date', fieldName: 'orderDate' })
  public orderDate: Date;

  @Property({ type: 'date', fieldName: 'requiredDate' })
  public requiredDate: Date;

  @Property({ type: 'date', nullable: true, fieldName: 'shippedDate' })
  public shippedDate: Date;

  @Property({ type: 'integer', fieldName: 'shipVia' })
  public shipVia: number;

  @Property({ type: 'decimal', precision: 10, scale: 4 })
  public freight: number;

  @Property({ type: 'text', fieldName: 'shipName' })
  public shipName: string;

  @Property({ type: 'text', fieldName: 'shipAddress' })
  public shipAddress: string;

  @Property({ type: 'text', fieldName: 'shipCity' })
  public shipCity: string;

  @Property({ type: 'text', nullable: true, fieldName: 'shipRegion' })
  public shipRegion: string;

  @Property({ type: 'text', nullable: true, fieldName: 'shipPostalCode' })
  public shipPostalCode: string;

  @Property({ type: 'text', fieldName: 'shipCountry' })
  public shipCountry: string;

  @ManyToOne(() => Employee, { fieldName: 'employeeId', referenceColumnName: 'id' })
  public employee: Employee;

  @ManyToOne(() => Customer, { fieldName: 'customerId', referenceColumnName: 'id' })
  public customer: Customer;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  public orderDetails = new Collection<OrderDetail>(this);

  @ManyToOne(() => Shipper, { fieldName: 'shipVia', referenceColumnName: 'id' })
  public shipper: Shipper;
}
