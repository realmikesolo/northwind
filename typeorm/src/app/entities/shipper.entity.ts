import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'shippers' })
export class Shipper {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'varchar', length: 40 })
  public companyName: string;

  @Column({ type: 'varchar', length: 24 })
  public phone: string;

  @OneToMany(() => Order, (order) => order.shipper)
  public orders: Order[];
}
