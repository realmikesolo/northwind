import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryColumn({ type: 'varchar', length: 5 })
  public id: string;

  @Column({ type: 'varchar', length: 40 })
  public companyName: string;

  @Column({ type: 'varchar', length: 30 })
  public contactName: string;

  @Column({ type: 'varchar', length: 30 })
  public contactTitle: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  public address: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  public city: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  public region: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  public postalCode: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  public country: string;

  @Column({ type: 'varchar', length: 24, nullable: true })
  public phone: string;

  @Column({ type: 'varchar', length: 24, nullable: true })
  public fax: string;

  @OneToMany(() => Order, (order) => order.customer)
  public orders: Order[];
}
