import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Movie } from 'src/app/core/interface/movies.interface';

/* The MovieItemComponent is a TypeScript class that represents a movie item component in an Angular
application, which takes an input of a movie object. */
@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
})
export class MovieItemComponent implements OnChanges {
  @Input() movie: Movie | {} | any = {};
  @Output() movieId = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    // Check if the 'movie' input property has changed
    if (changes['movie'] && !changes['movie'].firstChange) {
      // React to changes in the 'movie' input property from the parent component
      const newMovie = changes['movie'].currentValue as Movie;
      console.log('Child Component - New Movie:', newMovie);
    }
   
  }

  removeMovieInToFavorite(id: number) {
    this.movieId.emit(id);
  }
}
