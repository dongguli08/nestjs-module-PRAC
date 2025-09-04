import {Entity, PrimaryGeneratedColumn, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {BookEntity} from "../../books/entity/Books.entity";
import {UserEntity} from "../../users/entity/Users.entity";
import {LoanEntity} from "../entity/Loan.entity";
import {CreateLoanDto} from "../presentation/dto/request/Crate.Loan.dto";
import {BadRequestException, NotFoundException} from "@nestjs/common";


export class LoanService {
    constructor(
        @InjectRepository(BookEntity)
        private bookRepository: Repository<BookEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        @InjectRepository(LoanEntity)
        private readonly loanRepository: Repository<LoanEntity> //대출 생성, 조회, 반납, 삭제 등 Loan 엔티티 관련 DB 작업
    ) {}

    async createLoan(data: CreateLoanDto): Promise<LoanEntity> {
        const { userId, bookId } = data;

        // 1. 사용자 존재 여부 확인
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }

        // 2. 책 존재 여부 확인
        const book = await this.bookRepository.findOne({ where: { id: bookId } });
        if (!book) {
            throw new NotFoundException(`Book with id ${bookId} not found`);
        }

        // 3. 재고 확인
        if (book.stock < 1) {
            throw new BadRequestException(`Book "${book.title}" is out of stock`);
        }

        // 4. 대출 생성
        const loan = this.loanRepository.create({
            user,
            book,
            returnDate: null, // 아직 반납 안됨
        });

        // 5. 책 재고 감소
        book.stock -= 1;
        await this.bookRepository.save(book);

        // 6. 대출 저장
        return this.loanRepository.save(loan);
    }

    async returnLoanById(id: string) {

        const loan = await this.loanRepository.findOne({ where: { id } });
        if (!loan) {
            throw new NotFoundException(`Id ${id} not found`);
        }

        //이미 반납 확인
        if (loan.returnDate) {
            throw new BadRequestException(`This loan has already been returned on ${loan.returnDate}`);
        }

        loan.returnDate = new Date();
        await this.loanRepository.save(loan);

        loan.book.stock += 1;
        await this.bookRepository.save(loan.book);

        return {
            message: `Book "${loan.book.title}" returned successfully.`,
            loan,
        };
    }

    async findAllLoans(): Promise<LoanEntity[]> {
        // relations 옵션을 사용하면 eager 옵션 없이도 User와 Book 정보를 함께 가져올 수 있음
        return this.loanRepository.find({ relations: ['user', 'book'] }); //여러개 찾기 find
    }


    async findByID(id: string): Promise<LoanEntity> {
        const loan = await this.loanRepository.findOne({ where: { id } });
        if (!loan) {
            throw new NotFoundException(`Id ${id} not found`);
        }
        return loan;
    }

 //유저의 대출 결과
    async findByUser(userId: string): Promise<LoanEntity[]> {
        const loans = await this.loanRepository.find({ //findone은 한개를 가져오고 find는 여러개를 배열로
            where: {
                user: { id: userId }, // LoanEntity.user.id로 필터링
            },
            relations: ['user', 'book'], // 관계된 user, book 같이 조회
        });

        if (loans.length === 0) {
            throw new NotFoundException(`No loan records found for userId: ${userId}`);
        }

        return loans;
    }


//책의 대출 결과
    async findByBookId(bookId: string): Promise<LoanEntity[]> {
        const book =  await this.loanRepository.find({
            where: { book: { id: bookId } },  // BookEntity.id 기준으로 검색
        });
        if (book.length == 0) {
            throw new NotFoundException(`Book with id ${bookId} not found`);
        }
        return book;
    }


}

