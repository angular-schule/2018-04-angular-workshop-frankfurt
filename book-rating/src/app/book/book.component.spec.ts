import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookComponent } from './book.component';
import { BookRatingService } from '../shared/book-rating.service';

fdescribe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  const ratingMock = {
    rateUp: () => {},
    rateDown: () => {},
  };

  beforeEach(async(() => {
    spyOn(ratingMock, 'rateUp');
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

    setTimeout(() => {
      console.log('hallo');
    }, 4000);

  }));

  beforeEach(() => {
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
    expect(ratingMock.rateUp).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
