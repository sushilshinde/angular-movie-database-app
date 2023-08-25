import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of, Subscription } from 'rxjs';
import { allMovieReducer } from 'src/app/core/reducers/allMovies.reducer';
import { moviesReducer } from 'src/app/core/reducers/movies.reducers';
import { usersReducer } from 'src/app/core/reducers/users.reducers';
import { MovieRatingComponent } from '../movie-rating/movie-rating.component';

import { MovieRatingFormComponent } from './movie-rating-form.component';

describe('MovieRatingFormComponent', () => {
  let component: MovieRatingFormComponent;
  let fixture: ComponentFixture<MovieRatingFormComponent>;

  let mockStore: any;
  let mockSnackBar: any;

  beforeEach(async() => {

    mockStore = {
      select: jasmine.createSpy('select').and.returnValue(of({ activeUser: { username: 'testUser' } })),
      dispatch: jasmine.createSpy('dispatch')
    };

    mockSnackBar = {
      open: jasmine.createSpy('open')
    };

    await TestBed.configureTestingModule({
      declarations: [MovieRatingFormComponent, MovieRatingComponent],
      imports: [StoreModule.forRoot({ allmovies: allMovieReducer, users: usersReducer }), MatSnackBarModule, ReactiveFormsModule, MatIconModule, RouterTestingModule],
    
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();
    // fixture = TestBed.createComponent(MovieRatingFormComponent);
    // component = fixture.componentInstance;
    // component.movieId = 457332;

    // fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieRatingFormComponent);
    component = fixture.componentInstance;
    component.movieId = 457332;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the reviewForm with required controls', () => {
    const commentControl = component.reviewForm.get('comment') as FormControl;
    expect(commentControl).toBeTruthy();
    expect(commentControl.validator).toBeTruthy(); 
    expect(commentControl.hasValidator(Validators.required)).toEqual(true)
    // expect(commentControl.hasValidator(Validators.minLength(10))).toEqual(true)
  });

  it('should get rating', () => {
    component.getRating(3);
    expect(component.rating).toBe(3);
  });

  it('should submit review', () => {
    const mockComment = 'This is a test comment.';
    component.rating = 4;
    const commentControl = component.reviewForm.get('comment') as FormControl;
    commentControl.setValue(mockComment);

    component.submitReview();

    expect(mockStore.dispatch).toHaveBeenCalled();
    expect(mockStore.dispatch).toHaveBeenCalledWith(jasmine.objectContaining({
      type: '[movies] add review'
    }));
    expect(mockSnackBar.open).toHaveBeenCalled();
    expect(mockSnackBar.open).toHaveBeenCalledWith('You rated 4 / 5', '', {
      duration: 5000,
    });
  });

  it('should unsubscribe from userStoreSubscriber on ngOnDestroy', () => {
    spyOn(<Subscription>component.userStoreSubscriber, "unsubscribe");
    component.ngOnDestroy();
    expect(component.userStoreSubscriber?.unsubscribe).toHaveBeenCalled();
  });


});
