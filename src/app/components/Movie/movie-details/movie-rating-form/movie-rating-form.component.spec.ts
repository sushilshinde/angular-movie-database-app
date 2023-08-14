import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { allMovieReducer } from 'src/app/core/reducers/allMovies.reducer';
import { moviesReducer } from 'src/app/core/reducers/movies.reducers';
import { usersReducer } from 'src/app/core/reducers/users.reducers';
import { MovieRatingComponent } from '../movie-rating/movie-rating.component';

import { MovieRatingFormComponent } from './movie-rating-form.component';

describe('MovieRatingFormComponent', () => {
  let component: MovieRatingFormComponent;
  let fixture: ComponentFixture<MovieRatingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieRatingFormComponent, MovieRatingComponent],
      imports: [StoreModule.forRoot({ allmovies: allMovieReducer, users: usersReducer }), MatSnackBarModule, ReactiveFormsModule, MatIconModule, RouterTestingModule]
    });
    fixture = TestBed.createComponent(MovieRatingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
