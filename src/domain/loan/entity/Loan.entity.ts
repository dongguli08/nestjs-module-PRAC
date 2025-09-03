// src/domain/loan/entity/Loan.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import {UserEntity} from "../../users/entity/Users.entity";
import {BookEntity} from "../../books/entity/Books.entity";


@Entity('loans')
export class LoanEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    //하나의 대출(Loan)은 **하나의 사용자(User)**에 속함 + 하나의 사용자는 여러 대출(Loan[])을 가질 수 있음
    @ManyToOne(() => UserEntity, (user) => user.loans, { eager: true })
    user: UserEntity;
    //하나의 책은 여러 대출을 가질수 있음
    @ManyToOne(() => BookEntity, (book) => book.loans, { eager: true })
    book: BookEntity;

    @CreateDateColumn()
    loanDate: Date;

    @Column({ type: 'timestamp', nullable: true })
    returnDate: Date | null;
}
