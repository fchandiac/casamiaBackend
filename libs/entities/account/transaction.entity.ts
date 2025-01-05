import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
  } from 'typeorm';
  import { Account } from 'libs/entities/account/account.entity';
  
  @Entity()
  export class Transaction {
    @PrimaryGeneratedColumn('uuid')
  id: string; // ID único para cada cuenta
  
    @Column()
    transactionType: number; // 1: debit, 2: credit
  
    @Column()
    moneytype: number; // 1: money, 2: points
  
    @Column()
    type: string;
  
    @Column()
    reference: string;
  
    @Column()
    previusTransactionId: string;
  
    @Column()
    previusBalance: number;
  
    @Column()
    balance: number;
  
    @Column()
    amount: number;
  
    @ManyToOne(() => Account, (account) => account.transactions, { onDelete: 'CASCADE' })
    account: Account; // Relación con la cuenta
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;
  }
  