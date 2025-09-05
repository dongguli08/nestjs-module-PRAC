import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, JoinColumn } from 'typeorm';
import {UserEntity} from "../../users/entity/Users.entity";
import {BookEntity} from "../../books/entity/Books.entity";

@Entity('loans')
export class LoanEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, (user) => user.loans, {
        eager: true,
        onDelete: 'CASCADE'  // 사용자 삭제 시 대출 기록도 삭제
    })
    @JoinColumn({ name: 'user_id' }) // FK 컬럼명 지정
    user: UserEntity;

    @ManyToOne(() => BookEntity, (book) => book.loans, {
        eager: true,
        onDelete: 'CASCADE'  // 책 삭제 시 대출 기록도 삭제
    })
    @JoinColumn({ name: 'book_id' }) // FK 컬럼명 지정
    book: BookEntity;

    @CreateDateColumn()
    loanDate: Date;

    @Column({ type: 'timestamp', nullable: true })
    returnDate: Date | null;
}