import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {GlobalConfigModule} from "./global/config/Config.module";
import {ConfigService} from "./global/config/Config.service";
import {UserEntity} from "./domain/users/entity/Users.entity";
import {BookEntity} from "./domain/books/entity/Books.entity";
import {LoanEntity} from "./domain/loan/entity/Loan.entity";


@Module({
    imports: [
        GlobalConfigModule, // 글로벌 ConfigModule 등록
        TypeOrmModule.forRootAsync({
            imports: [GlobalConfigModule],
            inject: [ConfigService], // 커스텀 ConfigService 주입
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                driver: require('mysql2'),
                host: configService.getDatabaseHost(),
                port: configService.getDatabasePort(),
                username: configService.getDatabaseUsername(),
                password: configService.getDatabasePassword(),
                database: configService.getDatabaseName(),
                entities: [UserEntity, BookEntity, LoanEntity],
                synchronize: true, // 개발환경에서만 true
                logging: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
                maxQueryExecutionTime: 1000,
                ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
                extra: {
                    connectionLimit: 10,
                    connectTimeout: 60000, // 올바른 옵션
                },
            }),
        }),
    ],
})
export class AppModule {}
