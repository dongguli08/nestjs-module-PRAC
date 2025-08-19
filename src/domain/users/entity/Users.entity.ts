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

    @OneToMany(() => LoanEntity, (loan) => loan.user)
    loans: LoanEntity[];
}
