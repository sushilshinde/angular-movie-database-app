<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { CreditModel } from 'src/app/core/interface/credit.interface';
import { MovieModel } from 'src/app/core/interface/movie.interface';
import { DateFormatService } from 'src/app/core/services/date-format.service';
=======
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
>>>>>>> aswathi_s
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
<<<<<<< HEAD
export class MovieDetailsComponent implements OnInit {
  id: number = 0;
  movie?: MovieModel;
  expandActors: boolean = false;
  movieActors?: CreditModel[];
  releaseDate!: string;
  constructor(
    private store: Store<{ movies: { movies: MovieModel[] } }>,
    private route: ActivatedRoute,
    private router: Router,
    private dateService: DateFormatService
=======
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
>>>>>>> aswathi_s
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];

<<<<<<< HEAD
    this.store
=======
    this.userStoreSubscriber = this.store.select('users').subscribe(userStore => {
      this.activeUser = userStore.activeUser?.username ? true : false;
    })

    this.movieStoreSubscription = this.store
>>>>>>> aswathi_s
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
<<<<<<< HEAD
        this.releaseDate = this.dateService.fomatDate(this.movie!.release_date);
      });
  }

  addToFavorite() {
    console.log('Added to favorite');
    console.log(this.movie?.id);
  }

=======

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
>>>>>>> aswathi_s
  expandActorsSection() {
    if (!this.expandActors) {
      this.expandActors = true;
      this.movieActors = this.movie?.credits.slice();
    } else {
      this.expandActors = false;
      this.movieActors = this.movie?.credits.slice(0, 4);
    }
  }
<<<<<<< HEAD
=======

  ngOnDestroy(): void {
    this.userStoreSubscriber?.unsubscribe()
    this.movieStoreSubscription?.unsubscribe()
  }
>>>>>>> aswathi_s
}
