// src/global/config/config.module.ts
import { Global, Module } from '@nestjs/common';
import {ConfigModule as NestConfigModule} from '@nestjs/config';
import configuration from './configuration';
import {ConfigService} from "./Config.service";


@Global()
@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true, // 글로벌 설정
            load: [configuration], // configuration.ts 로드
        }),
    ],
    providers: [ConfigService], // 커스텀 ConfigService 제공
    exports: [ConfigService],   // 다른 모듈에서 바로 사용 가능
})
export class GlobalConfigModule {}
