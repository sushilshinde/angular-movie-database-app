import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { addToFavoriteList } from 'src/app/core/actions/user.actions';
import { ActorModel } from 'src/app/core/interface/movie-actor.interface';
import { MovieDetailsModel } from 'src/app/core/interface/movie.interface';

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
  constructor(
    private store: Store<{ movies: { movies: MovieDetailsModel[] } , users: { activeUser: any }}>,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];

    this.userStoreSubscriber = this.store.select('users').subscribe(userStore => {
      this.activeUser = userStore.activeUser?.username ? true : false;
    })

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
    this.userStoreSubscriber?.unsubscribe()
    this.movieStoreSubscription?.unsubscribe()
  }
}
