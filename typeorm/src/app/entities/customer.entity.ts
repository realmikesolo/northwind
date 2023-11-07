import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryColumn({ type: 'varchar', length: 5 })
  public id: string;

  @Column({ type: 'text' })
  public companyName: string;

  @Column({ type: 'text' })
  public contactName: string;

  @Column({ type: 'text' })
  public contactTitle: string;

  @Column({ type: 'text', nullable: true })
  public address: string;

  @Column({ type: 'text', nullable: true })
  public city: string;

  @Column({ type: 'text', nullable: true })
  public region: string;

  @Column({ type: 'text', nullable: true })
  public postalCode: string;

  @Column({ type: 'text', nullable: true })
  public country: string;

  @Column({ type: 'text', nullable: true })
  public phone: string;

  @Column({ type: 'text', nullable: true })
  public fax: string;

  @OneToMany(() => Order, (order) => order.customer)
  public orders: Order[];
}
