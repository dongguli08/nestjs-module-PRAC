import {Body, Controller, Get, Param, Patch, Post} from "@nestjs/common";
import {CreateLoanDto} from "./dto/request/Crate.Loan.dto";
import {LoanService} from "../service/Loan.service";



@Controller('loans')
export class LoanController {
    constructor(private readonly loanService: LoanService) {} // 의존성 주입

    @Post()
    async createLoan(@Body() data: CreateLoanDto) {
        return this.loanService.createLoan(data);
    }

    @Patch(':id/return')
    async returnLoan(@Param('id') id: string) {
        return this.loanService.returnLoanById(id);
    }

    @Get()
    async getAllLoans() {
        return this.loanService.findAllLoans();
    }

    @Get(':id')
    async getLoanById(@Param('id') id: string) {
        return this.loanService.findByID(id);
    }

    @Get('users/:userId')
    async getUserLoans(@Param('userId') userId: string) {
        return this.loanService.findByUser(userId);
    }

    @Get('books/:bookId')
    async getBookLoans(@Param('bookId') bookId: string) {
        return this.loanService.findByBookId(bookId);
    }
}
