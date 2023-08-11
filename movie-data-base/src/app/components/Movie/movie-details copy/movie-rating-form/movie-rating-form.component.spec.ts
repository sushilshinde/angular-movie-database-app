import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRatingFormComponent } from './movie-rating-form.component';

describe('MovieRatingFormComponent', () => {
  let component: MovieRatingFormComponent;
  let fixture: ComponentFixture<MovieRatingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieRatingFormComponent]
    });
    fixture = TestBed.createComponent(MovieRatingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
