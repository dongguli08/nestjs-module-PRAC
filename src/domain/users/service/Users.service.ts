import { Injectable, NotFoundException } from '@nestjs/common';
import {ConfigService} from "../../../global/config/Config.service";
import { UserEntity } from '../entity/Users.entity';
import { LoanEntity } from '../../loan/entity/Loan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(LoanEntity)
        private readonly loanRepository: Repository<LoanEntity>,
    ) {}

    // DB 정보 반환
    getDbInfo(): string {
        return `${this.configService.getDatabaseName()}@${this.configService.getDatabaseUsername()}`;
    }

    // 모든 사용자 조회
    findAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    // 단일 사용자 조회
    async findOneUser(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    // 사용자 생성
    createUser(name: string, email: string): Promise<UserEntity> {
        const user = this.userRepository.create({ name, email });
        return this.userRepository.save(user);
    }

    // 사용자 삭제
    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    // 전체 대출 기록 조회
    findAllLoans(): Promise<LoanEntity[]> {
        return this.loanRepository.find({ relations: ['user', 'book'] });
    }
}
