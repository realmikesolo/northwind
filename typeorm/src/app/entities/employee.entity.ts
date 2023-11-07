import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeTerritory } from './employee-territory.entity';
import { Order } from './order.entity';

@Entity({ name: 'employees' })
export class Employee {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'text' })
  public firstName: string;

  @Column({ type: 'text' })
  public lastName: string;

  @Column({ type: 'text' })
  public title: string;

  @Column({ type: 'text' })
  public titleOfCourtesy: string;

  @Column({ type: 'date' })
  public birthDate: Date;

  @Column({ type: 'date' })
  public hireDate: Date;

  @Column({ type: 'text' })
  public address: string;

  @Column({ type: 'text' })
  public city: string;

  @Column({ type: 'text', nullable: true })
  public region: string;

  @Column({ type: 'text' })
  public postalCode: string;

  @Column({ type: 'text' })
  public country: string;

  @Column({ type: 'text' })
  public homePhone: string;

  @Column({ type: 'text' })
  public extension: string;

  @Column({ type: 'text' })
  public notes: string;

  @Column({ type: 'integer', nullable: true })
  public reportsTo: number;

  @OneToMany(() => EmployeeTerritory, (employeeTerritory) => employeeTerritory.employee)
  public employeeTerritories: EmployeeTerritory[];

  @ManyToOne(() => Employee, (employee) => employee.subordinates)
  @JoinColumn({ name: 'reportsTo' })
  public manager: Employee;

  @OneToMany(() => Employee, (employee) => employee.manager)
  public subordinates: Employee[];

  @OneToMany(() => Order, (order) => order.employee)
  public orders: Order[];
}
