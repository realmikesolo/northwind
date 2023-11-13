import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Territory } from './territory.entity';

@Entity({ tableName: 'regions' })
export class Region {
  @PrimaryKey({ type: 'int', autoincrement: true })
  public id: number;

  @Property({ type: 'text' })
  public description: string;

  @OneToMany(() => Territory, (territory) => territory.region)
  public territories = new Collection<Territory>(this);
}
