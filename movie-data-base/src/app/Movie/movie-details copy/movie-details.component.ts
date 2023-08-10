import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { CreditModel } from 'src/app/core/models/credit.model';
import { MovieModel } from 'src/app/core/models/movie.model';
import { DateFormatService } from 'src/app/core/services/date-format.service';
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
  releaseDate!: string;
  constructor(
    private store: Store<{ movies: { movies: MovieModel[] } }>,
    private route: ActivatedRoute,
    private router: Router,
    private dateService: DateFormatService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];

    this.store
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
        this.releaseDate = this.dateService.fomatDate(this.movie!.release_date);
      
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
