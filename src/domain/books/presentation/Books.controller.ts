import {Body, Controller, Get, Param, Post, ValidationPipe} from "@nestjs/common";
import {CreateBookDto} from "./dto/req/Add.Book.dto";
import {BookEntity} from "../entity/Books.entity";
import {BooksService} from "../service/Books.service";


@Controller("books")
export class BooksController{
    constructor(private readonly bookService: BooksService) {
    }

    @Get()
    async findAll(): Promise<BookEntity[]>{
        return this.bookService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<BookEntity>{
        return this.bookService.findOne(id);
    }

    @Post('create')
    async addBook(@Body(new ValidationPipe()) data:CreateBookDto):Promise<BookEntity>{
        return this.bookService.createBook(data);
    }

}