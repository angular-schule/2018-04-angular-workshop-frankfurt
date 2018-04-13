import { BookStoreService } from './../shared/book-store.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Output } from '@angular/core';
import { Book } from '../shared/book';
import { tap, map, distinctUntilChanged, debounceTime, switchMap, catchError, filter } from 'rxjs/operators';
import { Observable, of, empty } from 'rxjs';

export interface HasTitle {
  title: string;
}

@Component({
  selector: 'br-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  bookForm: FormGroup;
  results$: Observable<Book[]>;

  @Output() createBook = new EventEmitter<Book>();

  constructor(private bs: BookStoreService) { }

  ngOnInit() {
    this.bookForm = new FormGroup({
      isbn: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      title: new FormControl('', Validators.required),
      description: new FormControl('')
    });

    this.results$ = this.bookForm.valueChanges.pipe(
      map((value: HasTitle) => value.title),
      // filter(title => title !== ''),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(title => this.bs.search(title).pipe(
        // catchError(() => empty()) // zeigt das letzte Ergebnis an
        catchError(() => of([])) // löscht die Liste
      ))
    );
  }

  isInvalid(name: string) {
    const control = this.bookForm.get(name);
    return control.invalid && control.dirty;
  }

  hasError(name: string, type: string) {
    const control = this.bookForm.get(name);
    return control.hasError(type) && control.dirty;
  }

  submitForm() {
    const { isbn, title, description } = this.bookForm.value;

    const newBook = {
      isbn,
      title,
      description,
      rating: 1
    };

    this.createBook.emit(newBook);
    this.bookForm.reset();
  }

}
