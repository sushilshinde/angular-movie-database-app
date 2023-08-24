import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { allMovieReducer } from 'src/app/core/reducers/allMovies.reducer';
import { usersReducer } from 'src/app/core/reducers/users.reducers';

import { FavoriteListComponent } from './favorite-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('FavoriteListComponent', () => {
  let component: FavoriteListComponent;
  let fixture: ComponentFixture<FavoriteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteListComponent],
      imports: [
        HttpClientModule,
        StoreModule.forRoot({
          allmovies: allMovieReducer,
          users: usersReducer,
        }),
        RouterTestingModule,
      ],
      providers:[MatSnackBar]
    });
    fixture = TestBed.createComponent(FavoriteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
