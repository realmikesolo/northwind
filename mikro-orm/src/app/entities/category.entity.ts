import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Product } from './product.entity';

@Entity({ tableName: 'categories' })
export class Category {
  @PrimaryKey({ type: 'int', autoincrement: true })
  public id: number;

  @Property({ type: 'text' })
  public name: string;

  @Property({ type: 'text' })
  public description: string;

  @OneToMany(() => Product, (product) => product.category)
  public products = new Collection<Product>(this);
}
