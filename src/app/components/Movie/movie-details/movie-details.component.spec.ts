import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { DateFormat } from 'src/app/shared/pipes/DateFormat.pipe';
import { MovieActorComponent } from './movie-actor/movie-actor.component';
import { MovieDetailsComponent } from './movie-details.component';
import { MovieRatingFormComponent } from './movie-rating-form/movie-rating-form.component';
import { MovieRatingComponent } from './movie-rating/movie-rating.component';
import { MovieReviewComponent } from './movie-review/movie-review.component';

import data from '../data.json'
import { HttpClientModule } from '@angular/common/http';

const mockMovies = data.movies.map((movie) => ({
  ...movie,
  ratings: [],
  rating: 3
}));

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let mockStore: MockStore;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  const initialState = {
    movies: { movies: mockMovies },
    users: { activeUser: { username: 'testUser' } },
  };

  beforeEach(async () => {
    const mockActivatedRoute = {
      snapshot: { params: { id: 1 } },
    };

    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    const mockStoreMethods = {
      select: () => of({ movies: { movies: mockMovies }, users: { activeUser: { username: 'testUser' } } }),
      dispatch: jasmine.createSpy(),
    };

    const mockSnackBarMethods = {
      open: jasmine.createSpy(),
    };

    await TestBed.configureTestingModule({
      declarations: [MovieDetailsComponent, DateFormat, MovieRatingFormComponent, MovieReviewComponent, MovieActorComponent, MovieRatingComponent],
      imports: [MatIconModule, HttpClientModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBarMethods },
        provideMockStore({ initialState }),
        { provide: Store, useValue: mockStoreMethods },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(Store) as MockStore;
    mockSnackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

    // Mock the store select method to return a mock movie
    spyOn(mockStore, 'select').and.returnValue(
      of({movies:  mockMovies})
    );

    component.movie = mockMovies[0]

    // Spy on MatSnackBar
    // spyOn(mockSnackBar, 'open');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // it('should navigate to movies page if movie is not found', () => {
  //   // Mock the store select method to return an empty movie list
  //   spyOn(mockStore, 'select').and.returnValue(of({ movies: { movies: [] }, users: { activeUser: { username: 'testUser' } } }));
  //   spyOn(component.router, 'navigate');
  //   component.ngOnInit();
  //   expect(component.router.navigate).toHaveBeenCalledWith(['/movies']);
  // });

  it('should call addToFavoriteList and open snackbar when addToFavorite is called', () => {
    component.movie = { id: 1 } as any;
    component.addToFavorite();
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      jasmine.objectContaining({ type: '[users] add to my favorites' })
    );
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Added to you favorite items!',
      'OK!',
      jasmine.any(Object)
    );
  });

  it('should expand/collapse actors section correctly', () => {
    component.expandActorsSection();
    expect(component.expandActors).toBe(true);
    expect(component.movieActors?.length).toBe(mockMovies[0].credits.length);

    component.expandActorsSection();
    expect(component.expandActors).toBe(false);
    expect(component.movieActors?.length).toBe(4); 
  });

  it('should unsubscribe from subscriptions on component destruction', () => {

    component.ngOnDestroy();

    if(component.userStoreSubscriber) {

      expect(component.userStoreSubscriber.unsubscribe).toHaveBeenCalled();
    }

    if(component.movieStoreSubscription) {

      expect(component.movieStoreSubscription.unsubscribe).toHaveBeenCalled();
    }
  });
});
