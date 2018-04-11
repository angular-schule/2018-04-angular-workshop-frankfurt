import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';


@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books: Book[];
  constructor() { }

  ngOnInit() {
    this.books = [
      {
        isbn: '000',
        title: 'Angular',
        description: 'tolles Buch',
        rating: 5
      },
      {
        isbn: '111',
        title: 'AngularJS',
        description: 'auch gutes Buch',
        rating: 3
      },
      {
        isbn: '22',
        title: 'test',
        description: 'test',
        rating: 2
      }
    ];
  }



  // https://angular.schule/blog/2018-03-pure-immutable-operations
  didRateBook(book: Book) {

    // Ansatz 1
    const cleanedList = this.books.filter(b => b.isbn !== book.isbn);
    this.books = [...cleanedList, book]
      .sort((a, b) => b.rating - a.rating);

    // Ansatz 2
    /*
    this.books = this.books
      .map(b => b.isbn === book.isbn ? book : b)
      .sort((a, b) => b.rating - a.rating);
    */
  }
}
