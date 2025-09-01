// src/domain/user/entity/User.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LoanEntity } from '../../loan/entity/Loan.entity';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({
        name: 'user_password',      // DB 컬럼 이름 커스텀
        length: 100,                // 최대 길이
        nullable: true,            // 필수 여부
        select: false               // 기본 조회 시 제외 (보안)
    })
    password: string;

    @OneToMany(() => LoanEntity, (loan) => loan.user)
    loans: LoanEntity[];
}
