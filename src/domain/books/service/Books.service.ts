import {BadRequestException, HttpStatus, Injectable, NotFoundException} from "@nestjs/common";
import {ConfigService} from "../../../global/config/Config.service";
import {InjectRepository} from "@nestjs/typeorm";
import {BookEntity} from "../entity/Books.entity";
import {Repository} from "typeorm";
import {CreateBookDto} from "../presentation/dto/req/Add.Book.dto";
import {UpdateBookDto} from "../presentation/dto/req/Update.Book.dto";


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
        const book = await this.bookRepository.findOne({where:{id}})
        if(!book){
            throw new BadRequestException("Book not found");
        }
        return book;
    }

    async createBooks(data: CreateBookDto): Promise<BookEntity>{
        const {title, author,stock} = data;
        const book = this.bookRepository.create({title, author, stock});
        return this.bookRepository.save(book);
    }


    async updateBooks(id: string, data: UpdateBookDto): Promise<BookEntity>{
        const book = await this.bookRepository.findOne({where:{id}});
        if(!book){
            throw new NotFoundException("Book not found");
        }
        const updateData = {
            title: data.title ?? book?.title,
            author: data.author ?? book?.author,
        }
        await this.bookRepository.save(updateData);
        return this.bookRepository.save(book);
    }

    async deleteBook(id: string){
        const book = await this.bookRepository.findOne({where:{id}});
        if(!book){
            throw new NotFoundException("Book not found");
        }
        await this.bookRepository.delete(id);
        return { message: `BookId : ${id} has been deleted successfully.`, statusCode: HttpStatus.OK };
    }
}