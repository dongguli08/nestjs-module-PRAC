// loan.module.ts (또는 app.module.ts)
import { TypeOrmModule } from '@nestjs/typeorm';
import {Module} from "@nestjs/common";
import {UserEntity} from "../users/entity/Users.entity";
import {BookEntity} from "../books/entity/Books.entity";
import {LoanEntity} from "./entity/Loan.entity";
import {LoanService} from "./service/Loan.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, BookEntity, LoanEntity]) // 3개 모두 등록
    ],
    providers: [LoanService],
    exports: [LoanService],
})
export class LoanModule {}