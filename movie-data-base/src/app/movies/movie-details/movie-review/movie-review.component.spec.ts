import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieReviewComponent } from './movie-review.component';

describe('MovieReviewComponent', () => {
  let component: MovieReviewComponent;
  let fixture: ComponentFixture<MovieReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieReviewComponent]
    });
    fixture = TestBed.createComponent(MovieReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
