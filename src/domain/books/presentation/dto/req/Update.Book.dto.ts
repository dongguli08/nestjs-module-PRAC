// src/domain/book/dto/update-book.dto.ts
import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class UpdateBookDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    author?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    stock?: number;
}
