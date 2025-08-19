// src/global/config/config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
    constructor(private readonly configService: NestConfigService) {} // <- 주입

    getDatabaseHost(): string {
        return this.configService.get<string>('database.host', 'localhost');
    }

    getDatabasePort(): number {
        return this.configService.get<number>('database.port', 3306);
    }

    getDatabaseUsername(): string {
        return this.configService.get<string>('database.username', 'root');
    }

    getDatabasePassword(): string {
        return this.configService.get<string>('database.password', '');
    }

    getDatabaseName(): string {
        return this.configService.get<string>('database.name', 'default_db');
    }

    getApiKey(): string {
        return this.configService.get<string>('api.key', '');
    }
}
