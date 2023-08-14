import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/core/interface/movies.interface';

/* The MovieItemComponent is a TypeScript class that represents a movie item component in an Angular
application, which takes an input of a movie object. */
@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent {
@Input() movie: Movie | {} | any = {};
}
