import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { EmployeeTerritory } from './employee-territory.entity';
import { Region } from './region.entity';

@Entity({ name: 'territories' })
export class Territory {
  @PrimaryColumn({ type: 'varchar', length: 20 })
  public id: string;

  @Column({ type: 'text' })
  public description: string;

  @Column({ name: 'regionId', type: 'int' })
  public regionId: number;

  @OneToMany(() => EmployeeTerritory, (employeeTerritory) => employeeTerritory.territory)
  public employeeTerritories: EmployeeTerritory[];

  @ManyToOne(() => Region, (region) => region.territories)
  @JoinColumn({ name: 'regionId', referencedColumnName: 'id' })
  public region: Region;
}
