import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { CreditModel, MovieModel } from 'src/app/reducers/movies.reducers';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  id: number = 0;
  movie?: MovieModel;
  expandActors: boolean = false;
  movieActors?: CreditModel[];
  constructor(
    private store: Store<{ movies: { movies: MovieModel[] } }>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];

    this.store
      .select('movies')
      .pipe(
        map((movieState) => {
          return movieState.movies.find((movie, index) => {
            return index === id;
          });
        })
      )
      .subscribe((movie) => {
        if (!movie) {
          this.router.navigate(['/movies']);
          console.log('movie not found!');
        }
        this.movie = movie;
        this.movieActors = movie?.credits.slice(0, 4);
        console.log(this.movie);
      });
  }

  addToFavorite() {
    console.log('Added to favorite');
    console.log(this.movie?.id);
  }

  expandActorsSection() {
    if (!this.expandActors) {
      this.expandActors = true;
      this.movieActors = this.movie?.credits.slice();
    } else {
      this.expandActors = false;
      this.movieActors = this.movie?.credits.slice(0, 4);
    }
  }
}
