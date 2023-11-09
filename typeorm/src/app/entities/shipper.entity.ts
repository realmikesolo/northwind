import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'shippers' })
export class Shipper {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'text' })
  public companyName: string;

  @Column({ type: 'text' })
  public phone: string;

  @OneToMany(() => Order, (order) => order.shipper)
  public orders: Order[];
}
