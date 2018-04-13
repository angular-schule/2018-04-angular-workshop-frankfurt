import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './book';
import { retry, share, catchError, delay } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable()
export class BookStoreService {

  constructor(private http: HttpClient) { }

  url = 'https://api.angular.schule';

  getAll(): Observable<Book[]> {
    return this.http
      .get<Book[]>(`${ this.url }/books`)
      .pipe(
        retry(3),
        catchError(err => of([{
          isbn: 'xxx',
          title: 'error',
          description: 'sorry, the internet is broken',
          rating: 0
        }])),
        delay(2000)
      );
  }

  sendBook(book: Book) {
    return this.http
      .post(`${ this.url }/book`, book)
      .pipe(
        retry(3)
      );
  }
}
