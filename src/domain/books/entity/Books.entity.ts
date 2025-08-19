// src/domain/book/entity/Book.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LoanEntity } from '../../loan/entity/Loan.entity';

@Entity('books')
export class BookEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 200 })
    title: string;

    @Column({ length: 100 })
    author: string;

    @Column({ default: 1 })
    stock: number; // 재고 수량

    @OneToMany(() => LoanEntity, (loan) => loan.book)
    loans: LoanEntity[];
}
