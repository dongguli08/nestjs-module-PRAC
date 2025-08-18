// src/domain/user/UserService.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    constructor(private readonly configService: ConfigService) {}

    getDatabaseHost(): string {
        // .env 파일에 정의된 DB_HOST 환경 변수 가져오기
        const dbHost = this.configService.get<string>('DB_HOST');
        return dbHost;
    }

    getSomeCustomValue(): string {
        // 다른 환경 변수 예시
        return this.configService.get<string>('CUSTOM_VALUE', 'defaultValue');
    }
}
