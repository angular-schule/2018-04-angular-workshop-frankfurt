import { BookRatingService } from './../shared/book-rating.service';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Book } from '../shared/book';
import { Output } from '@angular/core';

@Component({
  selector: 'br-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  preserveWhitespaces: false
})
export class BookComponent {

  @Input() book: Book;
  @Output() rate = new EventEmitter<Book>();

  constructor(public br: BookRatingService) {
  }

  rateUp() {
    const ratedBook = this.br.rateUp(this.book);
    this.rate.emit(ratedBook);
  }

  rateDown() {
    const ratedBook = this.br.rateDown(this.book);
    this.rate.emit(ratedBook);
  }
}
