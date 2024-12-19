import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, DeleteDateColumn, IntegerType } from 'typeorm';


@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string; // ID único para cada cuenta

  @Column({ type: 'int', default: 0 })
  type: number;

  @Column({ type: 'varchar', length: 50, default: '', unique: true })
  userName: string; // Nombre de usuario único

  @Column({ type: 'varchar', length: 100, default: '' })
  name: string; // Nombre del usuario

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string; // Correo electrónico del usuario

  @Column({type: 'int', default: 0})
  role: number; // Rol del usuario

  @Column({type: 'int', default: 0})
  gender: number; // Género del usuario


  @Column({ type: 'date', nullable: true })
  birthday: Date; // Fecha de nacimiento del usuario

  @Column({ type: 'int', default: 0 })
  points: number; // Puntos de la cuenta

  @Column({ type: 'decimal', default: 0 })
  clp: number; // Saldo en pesos chilenos

  @DeleteDateColumn()
  deletedAt: Date; // Columna que almacena la fecha de eliminación lógica
}