import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Employee } from './employee.entity';
import { Territory } from './territory.entity';

@Entity({ name: 'employee-territories' })
export class EmployeeTerritory {
  @PrimaryColumn({ type: 'integer' })
  public employeeId: number;

  @PrimaryColumn({ type: 'text' })
  public territoryId: string;

  @ManyToOne(() => Employee, (employee) => employee.employeeTerritories)
  @JoinColumn({ name: 'employeeId', referencedColumnName: 'id' })
  public employee: Employee;

  @ManyToOne(() => Territory, (territory) => territory.employeeTerritories)
  @JoinColumn({ name: 'territoryId', referencedColumnName: 'id' })
  public territory: Territory;
}
