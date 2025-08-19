// src/domain/user/UserService.ts
import { Injectable } from '@nestjs/common';
import {ConfigService} from "../../../global/config/Config.service";


@Injectable()
export class UserService {
    constructor(private readonly configService: ConfigService) {}


    getDbInfo(): string {
        return `${this.configService.getDatabaseName()}@${this.configService.getDatabaseUsername()}`;
    }
}
