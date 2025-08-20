import {Controller} from "@nestjs/common";


@Controller("books")
export class BooksController{
    constructor(private readonly bookService: BookService) {}


}