import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { allMovieReducer } from 'src/app/core/reducers/allMovies.reducer';
import { moviesReducer } from 'src/app/core/reducers/movies.reducers';
import { usersReducer } from 'src/app/core/reducers/users.reducers';

import { MovieDetailsComponent } from './movie-details.component';
import { MovieRatingFormComponent } from './movie-rating-form/movie-rating-form.component';
import { MovieRatingComponent } from './movie-rating/movie-rating.component';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieDetailsComponent, MovieRatingFormComponent, MovieRatingComponent],
      imports: [StoreModule.forRoot({ allmovies: allMovieReducer, users: usersReducer }), RouterTestingModule, MatSnackBarModule, MatIconModule]
      
    });
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
