import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmployeeTerritory } from './employee-territory.entity';
import { Order } from './order.entity';

@Entity({ name: 'employees' })
export class Employee {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'varchar', length: 255 })
  public firstName: string;

  @Column({ type: 'varchar', length: 255 })
  public lastName: string;

  @Column({ type: 'varchar', length: 255 })
  public title: string;

  @Column({ type: 'varchar', length: 255 })
  public titleOfCourtesy: string;

  @Column({ type: 'date' })
  public birthDate: Date;

  @Column({ type: 'date' })
  public hireDate: Date;

  @Column({ type: 'varchar', length: 60 })
  public address: string;

  @Column({ type: 'varchar', length: 15 })
  public city: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  public region: string;

  @Column({ type: 'varchar', length: 10 })
  public postalCode: string;

  @Column({ type: 'varchar', length: 15 })
  public country: string;

  @Column({ type: 'varchar', length: 24 })
  public homePhone: string;

  @Column({ type: 'varchar', length: 4 })
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
