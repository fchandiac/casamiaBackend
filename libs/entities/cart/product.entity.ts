// product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Category } from './category.entity'; // Importamos la entidad Category

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string; // UUID como clave primaria

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column({default: 'FUDO-CODE'})
  code: string;

  @Column({ nullable: true })
  description: string;

  @Column({default: 'https://lh3.googleusercontent.com/PdRhfappZeEvn28VJW6JO3cZP6fnZg7ympQ8CtShllt4V6Zfzv-X4OrRhXFmDE7Sn5SwFc6MsGn5VRX2Ndma=w1280-h1280-c-rw-v1-e365'})
  imageUrl: string;

  @ManyToOne(() => Category, category => category.products)
  category: Category | null; // Relación muchos a uno con Category

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}




