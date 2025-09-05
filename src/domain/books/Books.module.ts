// src/domain/user/UserModule.ts
import { Module } from '@nestjs/common';
import {BooksService} from "./service/Books.service";


@Module({
    providers: [BooksService],  // UserService를 이 모듈의 provider로 등록
    exports: [BooksService],    // 다른 모듈에서 UserService를 사용할 수 있도록 export
})
export class UserModule {}
