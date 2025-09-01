import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {ConfigService} from "../../../global/config/Config.service";
import { UserEntity } from '../entity/Users.entity';
import { LoanEntity } from '../../loan/entity/Loan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CreateUserDto} from "../presentation/dto/request/CreateUser.dto";
import {LoginUserDto} from "../presentation/dto/request/LoginUser.dto";
import { hash, compare } from 'bcrypt';



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
    async findAllUsers(): Promise<UserEntity[]> {
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
    async createUser(data: CreateUserDto): Promise<UserEntity> {
        const { name, email, password } = data;
        const encryptPassword = await this.encryptPassword(password);
        const user = this.userRepository.create({ name, email, password:encryptPassword });
        return this.userRepository.save(user);
    }

    async loginUser(data: LoginUserDto): Promise<UserEntity>{
        const { email,password } = data;
        const user = await this.userRepository.findOne({ where: {email}})
        if(!user){
            throw new NotFoundException(('user is not found'));
        }
        const matchPassword = await this.encryptPassword(password);
        if(!matchPassword){
            throw new UnauthorizedException('Wrong password');
        }
        return user
    }

    // 사용자 삭제
    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    // 전체 대출 기록 조회
    async findAllLoans(): Promise<LoanEntity[]> {
        return this.loanRepository.find({ relations: ['user', 'book'] });
    }

    async encryptPassword(password: string) {
        const DEFAULT_SALT = 11;
        return hash(password, DEFAULT_SALT); // bcryptjs 사용
    }
}
