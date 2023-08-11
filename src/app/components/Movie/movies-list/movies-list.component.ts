import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieMyService } from 'src/app/core/services/movie.service';
import { Subscription } from 'rxjs';
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
    this.subscription = this.movieService.getMovies().subscribe({
      next: (data) => {
        this.moviedata = data.movies.filter(
          (each) => each.media_type === 'movie'
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnDestroy() {
    //unsubscribe from the subscription(s) to prevent memory leaks.
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  //detail page handler
  gotoDetailPage(movieId: number) {
    //passing the movie to routing path and get with params and get method for the partical movie details
    this.router.navigate(['/movie', movieId]);
  }
}
