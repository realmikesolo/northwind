import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Product } from './product.entity';

@Entity({ tableName: 'suppliers' })
export class Supplier {
  @PrimaryKey({ type: 'integer', autoincrement: true })
  public id: number;

  @Property({ type: 'text', fieldName: 'companyName' })
  public companyName: string;

  @Property({ type: 'text', fieldName: 'contactName' })
  public contactName: string;

  @Property({ type: 'text', fieldName: 'contactTitle' })
  public contactTitle: string;

  @Property({ type: 'text' })
  public address: string;

  @Property({ type: 'text' })
  public city: string;

  @Property({ type: 'text', nullable: true })
  public region: string;

  @Property({ type: 'text', fieldName: 'postalCode' })
  public postalCode: string;

  @Property({ type: 'text' })
  public country: string;

  @Property({ type: 'text' })
  public phone: string;

  @Property({ type: 'text', nullable: true })
  public fax: string;

  @Property({ type: 'text', nullable: true, fieldName: 'homePage' })
  public homePage: string;

  @OneToMany(() => Product, (product) => product.supplier)
  public products = new Collection<Product>(this);
}
