import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Mission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  accountId: string;

  @Column({ default: 'FUDO-CODE',  })
  code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  status: number;

  @Column()
  points: number;

  @Column()
  money: number;

  @Column({ default: 'https://www.somoselcafe.com.ar/img/novedades/9.webp' })
  imageUrl: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
