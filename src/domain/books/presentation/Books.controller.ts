import {Controller, Post} from "@nestjs/common";


@Controller("books")
export class BooksController{
    constructor(private readonly bookService: BookService) {

    }

    @Post('create')
    async addBook

}