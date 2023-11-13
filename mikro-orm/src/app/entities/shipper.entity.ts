import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Order } from './order.entity';

@Entity({ tableName: 'shippers' })
export class Shipper {
  @PrimaryKey({ type: 'integer', autoincrement: true })
  public id: number;

  @Property({ type: 'text', fieldName: 'companyName' })
  public companyName: string;

  @Property({ type: 'text' })
  public phone: string;

  @OneToMany(() => Order, (order) => order.shipper)
  public orders = new Collection<Order>(this);
}
