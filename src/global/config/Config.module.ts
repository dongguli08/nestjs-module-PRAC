// src/global/config/config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // 글로벌로 선언: AppModule에서 import 없이 사용 가능
            load: [configuration], // configuration.ts 로드
        }),
    ],
})
export class GlobalConfigModule {}
