import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookComponent } from './book.component';
import { BookRatingService } from '../shared/book-rating.service';
import { By } from '@angular/platform-browser';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  const ratingMock = {
    rateUp: () => {},
    rateDown: () => {},
    // immer schön die Tests nachziehen! :-)
    rateDownAllowed: () => true,
    rateUpAllowed: () => true
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

    // possible, because of async()
    /*
    setTimeout(() => {
      console.log('hallo');
    }, 4000);
    */

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

  it('should rateUp() when the button is clicked', () => {
    const rateUpBtn = fixture.debugElement.query(By.css('[testRateUp]')).nativeElement as HTMLButtonElement;
    rateUpBtn.click();
    expect(ratingMock.rateUp).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
