import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { EmployeeTerritory } from './employee-territory.entity';
import { Region } from './region.entity';

@Entity({ tableName: 'territories' })
export class Territory {
  @PrimaryKey({ type: 'varchar', length: 20 })
  public id: string;

  @Property({ type: 'text' })
  public description: string;

  @Property({ type: 'int', fieldName: 'regionId' })
  public regionId: number;

  @OneToMany(() => EmployeeTerritory, (employeeTerritory) => employeeTerritory.territory)
  public employeeTerritories = new Collection<EmployeeTerritory>(this);

  @ManyToOne(() => Region, { fieldName: 'regionId', referenceColumnName: 'id' })
  public region: Region;
}
