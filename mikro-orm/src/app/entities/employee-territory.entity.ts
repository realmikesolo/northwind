import { Entity, ManyToOne, PrimaryKey, PrimaryKeyType } from '@mikro-orm/core';
import { Employee } from './employee.entity';
import { Territory } from './territory.entity';

@Entity({ tableName: 'employee-territories' })
export class EmployeeTerritory {
  @PrimaryKey({ type: 'integer', fieldName: 'employeeId' })
  public employeeId: number;

  @PrimaryKey({ type: 'text', fieldName: 'territoryId' })
  public territoryId: string;

  public [PrimaryKeyType]: [string, number];

  @ManyToOne(() => Employee, { fieldName: 'employeeId', referenceColumnName: 'id' })
  public employee: Employee;

  @ManyToOne(() => Territory, { fieldName: 'territoryId', referenceColumnName: 'id' })
  public territory: Territory;
}
