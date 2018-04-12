import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Output } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'br-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  bookForm: FormGroup;

  @Output() createBook = new EventEmitter<Book>();

  constructor() { }

  ngOnInit() {
    this.bookForm = new FormGroup({
      isbn: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      title: new FormControl('', Validators.required),
      description: new FormControl('')
    });

    this.bookForm.valueChanges.subscribe(
      e => console.log(e)
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
