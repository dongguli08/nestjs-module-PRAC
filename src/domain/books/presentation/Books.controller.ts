import {Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe} from "@nestjs/common";
import {CreateBookDto} from "./dto/req/Add.Book.dto";
import {BookEntity} from "../entity/Books.entity";
import {BooksService} from "../service/Books.service";
import {UpdateBookDto} from "./dto/req/Update.Book.dto";


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
    async addBooks(@Body(new ValidationPipe()) data:CreateBookDto):Promise<BookEntity>{
        return this.bookService.createBooks(data);
    }

    @Patch(':id')
    async updateBooks(
        @Param('id') id:string,
        @Body(new ValidationPipe()) data:UpdateBookDto):Promise<BookEntity>{
        return this.bookService.updateBooks(id,data)
    }

    @Delete(':id')
    async deleteBook(@Param('id') id:string){
        return this.bookService.deleteBook(id)
    }

}