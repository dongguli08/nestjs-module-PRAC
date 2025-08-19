import { Injectable } from '@nestjs/common';
import {ConfigService} from "../../../global/config/Config.service";
import {UserEntity} from "../entity/Users.entity";
import { InjectRepository } from '@nestjs/typeorm'; // 이거 꼭 추가
import { Repository } from 'typeorm';             // 이거도 꼭 추가

@Injectable()
export class UserService {
    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    getDbInfo(): string {
        return `${this.configService.getDatabaseName()}@${this.configService.getDatabaseUsername()}`;
    }

    async createUser(name: string, email: string): Promise<UserEntity> {
        const user = this.userRepository.create({ name, email });
        return this.userRepository.save(user);
    }

    async getUserById(id: number): Promise<UserEntity | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }
}
