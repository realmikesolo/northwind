import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'suppliers' })
export class Supplier {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'text' })
  public companyName: string;

  @Column({ type: 'text' })
  public contactName: string;

  @Column({ type: 'text' })
  public contactTitle: string;

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
  public phone: string;

  @Column({ type: 'text', nullable: true })
  public fax: string;

  @Column({ type: 'text', nullable: true })
  public homePage: string;

  @OneToMany(() => Product, (product) => product.supplier)
  public products: Product[];
}
