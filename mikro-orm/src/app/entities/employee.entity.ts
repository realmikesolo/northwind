import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { EmployeeTerritory } from './employee-territory.entity';
import { Order } from './order.entity';

@Entity({ tableName: 'employees' })
export class Employee {
  @PrimaryKey({ type: 'integer', autoincrement: true })
  public id: number;

  @Property({ type: 'text', fieldName: 'firstName' })
  public firstName: string;

  @Property({ type: 'text', fieldName: 'lastName' })
  public lastName: string;

  @Property({ type: 'text' })
  public title: string;

  @Property({ type: 'text', fieldName: 'titleOfCourtesy' })
  public titleOfCourtesy: string;

  @Property({ type: 'date', fieldName: 'birthDate' })
  public birthDate: Date;

  @Property({ type: 'date', fieldName: 'hireDate' })
  public hireDate: Date;

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

  @Property({ type: 'text', fieldName: 'homePhone' })
  public homePhone: string;

  @Property({ type: 'text' })
  public extension: string;

  @Property({ type: 'text' })
  public notes: string;

  @Property({ type: 'integer', nullable: true, fieldName: 'reportsTo' })
  public reportsTo: number;

  @OneToMany(() => EmployeeTerritory, (employeeTerritory) => employeeTerritory.employee)
  public employeeTerritories = new Collection<EmployeeTerritory>(this);

  @ManyToOne(() => Employee, { fieldName: 'reportsTo', referenceColumnName: 'id' })
  public manager: Employee;

  @OneToMany(() => Employee, (employee) => employee.manager)
  public subordinates = new Collection<Employee>(this);

  @OneToMany(() => Order, (order) => order.employee)
  public orders = new Collection<Order>(this);
}
