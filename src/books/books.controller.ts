import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksService } from './books.service';
import { Book } from './types/book.type';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): Observable<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<Book> {
    return this.booksService.findOneById(id);
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto): Observable<Book> {
    return this.booksService.create(createBookDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Observable<Book> {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<Book> {
    return this.booksService.delete(id);
  }

  @Get('title/:title')
  findByTitle(@Param('title') title: string): Observable<Book[]> {
    return this.booksService.findByTitle(title);
  }

  @Get('author/:author')
  findByAuthor(@Param('author') author: string): Observable<Book[]> {
    return this.booksService.findByAuthor(author);
  }

  @Get('genre/:genre')
  findByGenre(@Param('genre') genre: string): Observable<Book[]> {
    return this.booksService.findByGenre(genre);
  }

  @Get('year/:year')
  findByYearOfPublication(@Param('year') year: number): Observable<Book[]> {
    return this.booksService.findByYearOfPublication(year);
  }

  @Get('search/:query')
  async searchBooks(
    @Param('query') query: string,
  ): Promise<Observable<Book[]>> {
    return this.booksService.searchBooks(query);
  }

  @Get('findPopular/popular')
  findPopularBooks(): Observable<Book[]> {
    return this.booksService.findPopularBooks();
  }
}
