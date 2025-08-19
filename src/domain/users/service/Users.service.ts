// src/domain/user/UserService.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    constructor(private readonly configService: ConfigService) {}


    getSomeCustomValue(): string {
        // 다른 환경 변수 예시
        return this.configService.get<string>('CUSTOM_VALUE', 'defaultValue');
    }
}
