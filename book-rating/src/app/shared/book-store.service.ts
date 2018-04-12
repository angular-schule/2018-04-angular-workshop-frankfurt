import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './book';
import { retry, share } from 'rxjs/operators';

@Injectable()
export class BookStoreService {

  constructor(private http: HttpClient) { }

  url = 'https://api.angular.schule';

  getAll() {
    return this.http
      .get<Book[]>(`${ this.url }/books`)
      .pipe(
        retry(3)
      );
  }

  sendBook(book: Book) {
    const x = this.http
      .post(`${ this.url }/book`, book) // HOT
      .pipe(
        share()   // COLD (a simple cache)
      );

    x.subscribe();
    x.subscribe();
  }
}
