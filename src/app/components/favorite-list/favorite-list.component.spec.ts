import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MovieDetailsModel } from 'src/app/core/interface/movie.interface';
import data from '../Movie/data.json'

import { FavoriteListComponent } from './favorite-list.component';

describe('FavoriteListComponent', () => {
  let component: FavoriteListComponent;
  let fixture: ComponentFixture<FavoriteListComponent>;

  let mockStore: any;

  beforeEach(async() => {

    mockStore = {
      select: jasmine.createSpy('select').and.returnValue({
        subscribe: (callback: any) => {
          callback({});
          return {
            unsubscribe: jasmine.createSpy('unsubscribe')
          };
        }
      })
    };

    await TestBed.configureTestingModule({
      declarations: [FavoriteListComponent],
      imports: [StoreModule.forRoot({}), RouterTestingModule, HttpClientModule, MatSnackBarModule],
      providers: [
        { provide: Store, useValue: mockStore }
      ]
    }).compileComponents();
    // fixture = TestBed.createComponent(FavoriteListComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve favorite movies from the store', () => {
    // Set up mock data for activeUser and movies in the store
    const mockActiveUser = { favorite_list: [457332, 346698] };
    const mockMovies: MovieDetailsModel[] = data.movies.map((movie) => ({
      ...movie,
      ratings: [],
      rating: 3
    }));
    mockStore.select.and.returnValue({
      subscribe: (callback: any) => {
        callback({ activeUser: mockActiveUser });
        return {
          unsubscribe: jasmine.createSpy('unsubscribe')
        };
      }
    });

    // Set up the movie store mock data
    mockStore.select.withArgs('movies').and.returnValue({
      subscribe: (callback: any) => {
        callback({ movies: mockMovies });
        return {
          unsubscribe: jasmine.createSpy('unsubscribe')
        };
      }
    });

    // Trigger ngOnInit
    component.ngOnInit();

    expect(component.myFavorites).toEqual([
      mockMovies[0],
      mockMovies[1]
    ]);
  });

  it('should unsubscribe from userStoreSubscription and movieStoreSubscription on ngOnDestroy', () => {
    // if(component.userStoreSubscription) {
    //   spyOn(component.userStoreSubscription, 'unsubscribe');
    // }

    // if(component.movieStoreSubscripption) {
    //   spyOn(component.movieStoreSubscripption, 'unsubscribe');
    // }
    component.ngOnDestroy();
    
    if(component.userStoreSubscription) {
      expect(component.userStoreSubscription?.unsubscribe).toHaveBeenCalled();

    }

    if(component.movieStoreSubscripption) {

      expect(component.movieStoreSubscripption?.unsubscribe).toHaveBeenCalled();
    }
    
  });

});
