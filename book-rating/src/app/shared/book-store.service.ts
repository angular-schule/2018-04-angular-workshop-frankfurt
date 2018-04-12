import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from './book';
import { retry } from 'rxjs/operators';

@Injectable()
export class BookStoreService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http
      .get<Book[]>('https://api.angular.schule/books')
      .pipe(
        retry(3)
      );
  }

}
