import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MovieRatingComponent } from '../movie-rating/movie-rating.component';

import { MovieReviewComponent } from './movie-review.component';

describe('MovieReviewComponent', () => {
  let component: MovieReviewComponent;
  let fixture: ComponentFixture<MovieReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieReviewComponent, MovieRatingComponent],
      imports: [MatIconModule]
    });
    fixture = TestBed.createComponent(MovieReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
