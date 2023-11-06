import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'suppliers' })
export class Supplier {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'varchar', length: 40 })
  public companyName: string;

  @Column({ type: 'varchar', length: 30 })
  public contactName: string;

  @Column({ type: 'varchar', length: 30 })
  public contactTitle: string;

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
  public phone: string;

  @Column({ type: 'varchar', length: 24, nullable: true })
  public fax: string;

  @Column('text', { nullable: true })
  public homePage: string;

  @OneToMany(() => Product, (product) => product.supplier)
  public products: Product[];
}
