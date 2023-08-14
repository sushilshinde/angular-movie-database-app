import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/core/interface/movies.interface';

/* The CategoryItemComponent class is a TypeScript component that represents a category item and
accepts a movie as an input. */
@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent {
  @Input() movie: Movie | {} | any = {};
}
