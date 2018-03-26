import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/Book';

@Injectable()
export class BookService {

  constructor(private http: HttpClient) { }

  // GET ALL BOOKS
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:3000/api/library/book');
  }

  // GET A BOOK
  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`http://localhost:3000/api/library/book/${id}`);
  }

  // SAVE A BOOK
  insertBook(book: Book): Observable<Book> {
    return this.http.post<Book>('http://localhost:3000/api/library/book', book);
  }

  // UPDATE A BOOK
  updateBook(id: string, book: Book): Observable<void> {
    return this.http.put<void>(`http://localhost:3000/api/library/book/${id}`, book);
  }

  // DELETE A BOOK
  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/api/library/book/${id}`);
  }

}
