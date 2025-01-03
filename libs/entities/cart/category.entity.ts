// category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity'; // Importamos la entidad Product

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string; // UUID como clave primaria

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string; // Campo opcional

  @OneToMany(() => Product, product => product.category)
  products: Product[]; // Relación con Product
}
