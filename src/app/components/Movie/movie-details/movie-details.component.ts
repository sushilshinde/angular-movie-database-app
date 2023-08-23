import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription, Subject, take, takeUntil } from 'rxjs';
import { addToFavoriteList } from 'src/app/core/actions/user.actions';
import { ActorModel } from 'src/app/core/interface/movie-actor.interface';
import { MovieDetailsModel } from 'src/app/core/interface/movie.interface';
import { HttpClient } from '@angular/common/http';

/* The `MovieDetailsComponent` class is a TypeScript component that handles the display and
functionality of a movie's details. */
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  userStoreSubscriber?: Subscription;
  movieStoreSubscription?: Subscription;
  activeUser: boolean = false;
  id: number = 0;
  movie?: MovieDetailsModel;
  expandActors: boolean = false;
  movieActors?: ActorModel[];
  addToFavoriteStatus: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<{
      movies: { movies: MovieDetailsModel[] };
      users: { activeUser: any };
    }>,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    //we getting the user key for post method in firebase

    const id = +this.route.snapshot.params['id'];

    this.userStoreSubscriber = this.store
      .select('users')
      .pipe(takeUntil(this.destroy$))
      .subscribe((userStore) => {
        this.activeUser = userStore.activeUser?.username ? true : false;
      });

    this.movieStoreSubscription = this.store
      .select('movies')
      .pipe(
        map((movieState) => {
          return movieState.movies.find((movie, index) => {
            return movie.id === id;
          });
        })
      )
      .subscribe((movie) => {
        console.log('movie detail subscribed');
        if (!movie) {
          this.router.navigate(['/movies']);
          console.log('movie not found!');
        }
        this.movie = movie;
        this.movieActors = movie?.credits.slice(0, 4);
      });
  }

  /**
   * The `addToFavorite` function dispatches an action to add a movie to the favorite list and displays a
   * snackbar notification.
   */
  addToFavorite() {
    this.store.dispatch(
      addToFavoriteList({
        movieId: this.movie?.id,
      })
    );
    //update already added to favorite status
    this.addToFavoriteStatus = true;
    //getting the key form local storage
    const userkey = localStorage.getItem('userkey');
    if (userkey) {
      this.store
        .select('users')
        .pipe(
          take(1), // Use 'take' to complete the observable after one emission
          takeUntil(this.destroy$) // Use takeUntil to manage subscription
        )
        .subscribe({
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
                    console.log('put data response count', res);
                  },
                });
            }
          },
          error: (error) => {
            console.log('add movies put failed due to', error);
          },
        });
    }

    this.snackBar.open('Added to you favorite items!', 'OK!', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  /**
   * The function `expandActorsSection` expands or collapses the actors section of a movie, showing all
   * actors if it is currently collapsed, and showing only the first four actors if it is currently
   * expanded.
   */
  expandActorsSection() {
    if (!this.expandActors) {
      this.expandActors = true;
      this.movieActors = this.movie?.credits.slice();
    } else {
      this.expandActors = false;
      this.movieActors = this.movie?.credits.slice(0, 4);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
