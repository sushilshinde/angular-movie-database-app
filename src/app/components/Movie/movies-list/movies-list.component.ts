import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieMyService } from 'src/app/core/services/movie.service';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from 'src/app/core/interface/movies.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent implements OnInit, OnDestroy {
  moviedata: Movie[] = [];
  private subscription?: Subscription;

  constructor(private movieService: MovieMyService, private router: Router) {}

  ngOnInit() {
    this.subscription = this.movieService
      .getMovies()
      .pipe(
        catchError((error) => {
          console.error('An error occurred while fetching movies:', error);
          return throwError(error); // Rethrow the error to propagate it
        })
      )
      .subscribe({
        next: (data) => {
          this.moviedata = data.movies.filter(
            (each) => each.media_type === 'movie'
          );
        },
      });
  }

  ngOnDestroy() {
    // Unsubscribe from the subscription(s) to prevent memory leaks.
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Detail page handler
  gotoDetailPage(movieId: number) {
    // Passing the movie to routing path and get with params and get method for the partial movie details
    this.router.navigate(['/movie', movieId]);
  }
}
