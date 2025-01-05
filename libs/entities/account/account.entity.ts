import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from 'typeorm';
import { Transaction } from 'libs/entities/account/transaction.entity';

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

  @Column({ type: 'int', default: 0 })
  role: number; // Rol del usuario

  @Column({ type: 'int', default: 0 })
  gender: number; // Género del usuario

  @Column({ type: 'date', nullable: true })
  birthday: Date; // Fecha de nacimiento del usuario

  @Column({ type: 'int', default: 0 })
  points: number; // Puntos de la cuenta

  @Column({ type: 'int', default: 0 })
  money: number; // Saldo en pesos chilenos

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[]; // Relación con las transacciones

  @DeleteDateColumn()
  deletedAt: Date; // Columna que almacena la fecha de eliminación lógica
}
