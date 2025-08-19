import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {GlobalConfigModule} from "./global/config/Config.module";


@Module({
    imports: [
        GlobalConfigModule, // 글로벌 ConfigModule 한 번만 등록
        TypeOrmModule.forRootAsync({
            imports: [GlobalConfigModule],
            useFactory: () => ({
                type: 'mysql',
                driver: require('mysql2'),
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT || '3306'),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                entities: [

                ],
                synchronize: process.env.NODE_ENV !== 'production',
                logging: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
                maxQueryExecutionTime: 1000,
                ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
                extra: {
                    connectionLimit: 10,
                    acquireTimeout: 60000,
                    timeout: 60000,
                },
            }),
        }),

    ],
})
export class AppModule {}
