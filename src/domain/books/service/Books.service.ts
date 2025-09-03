import {BadRequestException, Injectable} from "@nestjs/common";
import {ConfigService} from "../../../global/config/Config.service";
import {InjectRepository} from "@nestjs/typeorm";
import {BookEntity} from "../entity/Books.entity";
import {Repository} from "typeorm";
import {CreateBookDto} from "../presentation/dto/req/Add.Book.dto";


@Injectable()
export class BooksService {
    constructor(
    private readonly configService: ConfigService,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>
    ){}

    async findAll(): Promise<BookEntity[]>{
        return this.bookRepository.find();
    }

    async findOne(id: string): Promise<BookEntity>{
        const user = await this.bookRepository.findOne({where:{id}})
        if(!user){
            throw new BadRequestException("User not found");
        }
        return user;
    }

    async createBook(createBookDto: CreateBookDto): Promise<BookEntity>{
        const {title, author,stock} = createBookDto;
        const book = this.bookRepository.create({title, author, stock});
        return this.bookRepository.save(book);
    }

}