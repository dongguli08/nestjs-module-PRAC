// src/domain/loan/entity/Loan.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import {UserEntity} from "../../users/entity/Users.entity";
import {BookEntity} from "../../books/entity/Books.entity";


@Entity('loans')
export class LoanEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.loans, { eager: true })
    user: UserEntity;

    @ManyToOne(() => BookEntity, (book) => book.loans, { eager: true })
    book: BookEntity;

    @CreateDateColumn()
    loanDate: Date;

    @Column({ type: 'timestamp', nullable: true })
    returnDate: Date | null;
}
