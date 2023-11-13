import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Order } from './order.entity';

@Entity({ tableName: 'customers' })
export class Customer {
  @PrimaryKey({ type: 'varchar', length: 5 })
  public id: string;

  @Property({ type: 'text', fieldName: 'companyName' })
  public companyName: string;

  @Property({ type: 'text', fieldName: 'contactName' })
  public contactName: string;

  @Property({ type: 'text', fieldName: 'contactTitle' })
  public contactTitle: string;

  @Property({ type: 'text', nullable: true })
  public address: string;

  @Property({ type: 'text', nullable: true })
  public city: string;

  @Property({ type: 'text', nullable: true })
  public region: string;

  @Property({ type: 'text', nullable: true, fieldName: 'postalCode' })
  public postalCode: string;

  @Property({ type: 'text', nullable: true })
  public country: string;

  @Property({ type: 'text', nullable: true })
  public phone: string;

  @Property({ type: 'text', nullable: true })
  public fax: string;

  @OneToMany(() => Order, (order) => order.customer)
  public orders = new Collection<Order>(this);
}
