import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Territory } from './territory.entity';

@Entity({ name: 'regions' })
export class Region {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column({ type: 'varchar', length: 255 })
  public description: string;

  @OneToMany(() => Territory, (territory) => territory.region)
  public territories: Territory[];
}
