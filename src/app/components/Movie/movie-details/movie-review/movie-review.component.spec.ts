import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { RatingModel } from 'src/app/core/interface/rating.interface';
import { DateFormat } from 'src/app/shared/pipes/DateFormat.pipe';
import { MovieRatingComponent } from '../movie-rating/movie-rating.component';

import { MovieReviewComponent } from './movie-review.component';

describe('MovieReviewComponent', () => {
  let component: MovieReviewComponent;
  let fixture: ComponentFixture<MovieReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieReviewComponent, MovieRatingComponent, DateFormat],
      imports: [MatIconModule]
    }).compileComponents()
    fixture = TestBed.createComponent(MovieReviewComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an input review', () => {
    const mockReview: RatingModel = {
      name: 'User',
      rating: 5,
      comment: 'Was a nice movie to watch!',
      date: Date.now().toString()
    };

    component.review = mockReview;

    fixture.detectChanges()

    expect(component.review).toEqual(mockReview);
  });
});
