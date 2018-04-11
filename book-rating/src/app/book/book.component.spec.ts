import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookComponent } from './book.component';
import { BookRatingService } from '../shared/book-rating.service';

fdescribe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  let rateUpWasCalled: boolean;
  const ratingMock = {
    rateUp: () => rateUpWasCalled = true,
    rateDown: () => {},
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookComponent ],
      // Integrations-Test
      // providers: [BookRatingService]
      providers: [
        {
          provide: BookRatingService,
          useValue: ratingMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    rateUpWasCalled = false;
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    component.book = {
      isbn: '',
      title: '',
      description: '',
      rating: 1
    };
    fixture.detectChanges();
  });

  it('should forward the rateUp call on rateUp() ', () => {
    component.rateUp();
    expect(rateUpWasCalled).toBe(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
