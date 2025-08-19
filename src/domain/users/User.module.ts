// src/domain/user/UserModule.ts
import { Module } from '@nestjs/common';
import {UserService} from "./service/Users.service";


@Module({
    providers: [UserService],  // UserService를 이 모듈의 provider로 등록
    exports: [UserService],    // 다른 모듈에서 UserService를 사용할 수 있도록 export
})
export class UserModule {}
