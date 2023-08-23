import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RemoveToFavoriteList } from 'src/app/core/actions/user.actions';
import { MovieDetailsModel } from 'src/app/core/interface/movie.interface';
import { User } from 'src/app/core/interface/user.interface';

/* The FavoriteListComponent is a TypeScript component that retrieves the favorite movies of a user
from a store and displays them. */
@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css'],
})
export class FavoriteListComponent implements OnInit, OnDestroy {
  myFavorites: MovieDetailsModel[] = [];
  user?: User;
  userStoreSubscription?: Subscription;
  movieStoreSubscripption?: Subscription;

  constructor(
    private store: Store<{
      users: { activeUser: any };
      movies: { movies: MovieDetailsModel[] };
    }>,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userStoreSubscription = this.store
      .select('users')
      .subscribe((userStore) => {
        let movieIds = userStore.activeUser?.favorite_list || [];

        if (movieIds && movieIds.length > 0) {
          this.movieStoreSubscripption = this.store
            .select('movies')
            .subscribe((movieStore) => {
              const favMovies = movieStore.movies.filter((movie) =>
                movieIds.includes(movie.id)
              );
              this.myFavorites = favMovies;
            });
        }
      });
    console.log(this.myFavorites);
  }
  removeMovieInToFavorite(movieid: number) {
    this.store.dispatch(
      RemoveToFavoriteList({
        movieId: movieid,
      })
    );
    //getting the key form local storage
    const userkey = localStorage.getItem('userkey');
    this.store.select('users').subscribe({
      next: (data) => {
        console.log('checking activer user data', data.activeUser);
        if (data) {
          this.http
            .put(
              `https://udemy-section-18-default-rtdb.firebaseio.com/users/${userkey}.json`,
              data.activeUser
            )
            .subscribe({
              next: (res) => {
                console.log('put data response', res);
              },
            });
        }
      },
      error: (error) => {
        console.log('movies not updated');
      },
    });

    this.snackBar.open('Remove to you favorite items!', 'OK!', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  ngOnDestroy(): void {
    this.userStoreSubscription?.unsubscribe();
    this.movieStoreSubscripption?.unsubscribe();
  }
}
