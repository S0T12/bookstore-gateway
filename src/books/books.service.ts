import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './types/book.type';

@Injectable()
export class BooksService {
  constructor(
    @Inject('BOOK_SERVICE') private readonly clientProxy: ClientProxy,
  ) {}

  create(createBookDto: CreateBookDto): Observable<Book> {
    return this.clientProxy.send<Book>({ cmd: 'createBook' }, createBookDto);
  }

  findAll(): Observable<Book[]> {
    return this.clientProxy.send<Book[]>({ cmd: 'findAllBooks' }, {});
  }

  findOneById(id: string): Observable<Book> {
    return this.clientProxy.send<Book>({ cmd: 'findOneBook' }, id);
  }

  update(id: string, updateBookDto: UpdateBookDto): Observable<Book> {
    return this.clientProxy.send<Book>(
      { cmd: 'updateBook' },
      { id, ...updateBookDto },
    );
  }

  delete(id: string): Observable<Book> {
    return this.clientProxy.send<Book>({ cmd: 'removeBook' }, id);
  }

  findByTitle(title: string): Observable<Book[]> {
    return this.clientProxy.send<Book[]>({ cmd: 'findByTitle' }, title);
  }

  findByAuthor(author: string): Observable<Book[]> {
    return this.clientProxy.send<Book[]>({ cmd: 'findByAuthor' }, author);
  }

  findByGenre(genre: string): Observable<Book[]> {
    return this.clientProxy.send<Book[]>({ cmd: 'findByGenre' }, genre);
  }

  findByYearOfPublication(year: number): Observable<Book[]> {
    return this.clientProxy.send<Book[]>(
      { cmd: 'findByYearOfPublication' },
      year,
    );
  }

  searchBooks(query: string): Observable<Book[]> {
    console.log(query);
    return this.clientProxy.send<Book[]>({ cmd: 'searchBooks' }, query);
  }

  findPopularBooks(): Observable<Book[]> {
    return this.clientProxy.send<Book[]>({ cmd: 'findPopularBooks' }, {});
  }
}
