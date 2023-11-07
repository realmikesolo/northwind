import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from './employee.entity';
import { Customer } from './customer.entity';
import { OrderDetail } from './order-detail.entity';
import { Shipper } from './shipper.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'integer' })
  public employeeId: number;

  @Column({ type: 'text' })
  public customerId: string;

  @Column({ type: 'date' })
  public orderDate: Date;

  @Column({ type: 'date' })
  public requiredDate: Date;

  @Column({ type: 'date', nullable: true })
  public shippedDate: Date;

  @Column({ type: 'integer' })
  public shipVia: number;

  @Column({ type: 'decimal', precision: 10, scale: 4 })
  public freight: number;

  @Column({ type: 'text' })
  public shipName: string;

  @Column({ type: 'text' })
  public shipAddress: string;

  @Column({ type: 'text' })
  public shipCity: string;

  @Column({ type: 'text', nullable: true })
  public shipRegion: string;

  @Column({ type: 'text', nullable: true })
  public shipPostalCode: string;

  @Column({ type: 'text' })
  public shipCountry: string;

  @ManyToOne(() => Employee, (employee) => employee.orders)
  @JoinColumn({ name: 'employeeId', referencedColumnName: 'id' })
  public employee: Employee;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'customerId', referencedColumnName: 'id' })
  public customer: Customer;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  public orderDetails: OrderDetail[];

  @ManyToOne(() => Shipper, (shipper) => shipper.orders)
  @JoinColumn({ name: 'shipVia', referencedColumnName: 'id' })
  public shipper: Shipper;
}
