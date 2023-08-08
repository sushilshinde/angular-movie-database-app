import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from 'src/app/core/models/movies.modal';
@Pipe({
  name: 'movieSort',
})
export class MovieSortPipe implements PipeTransform {
  //using pipe sorting the movies
  transform(movies: Movie[], sortOption: string): Movie[] {
    if (!movies) return [];
    if (!sortOption) return movies;

    switch (sortOption) {
      case 'Title(A-Z)':
        return movies.slice().sort((a, b) => a.title.localeCompare(b.title));
      case 'Title(Z-A)':
        return movies.slice().sort((a, b) => b.title.localeCompare(a.title));
      case 'Release Date Ascending':
        return movies
          .slice()
          .sort(
            (a, b) =>
              new Date(a.release_date).getTime() -
              new Date(b.release_date).getTime()
          );
      case 'Release Date Descending':
        return movies
          .slice()
          .sort(
            (a, b) =>
              new Date(b.release_date).getTime() -
              new Date(a.release_date).getTime()
          );
      case 'Rating Ascending':
        return movies.slice().sort((a, b) => a.rating - b.rating);
      case 'Rating Descending':
        return movies.slice().sort((a, b) => b.rating - a.rating);
      default:
        return movies;
    }
  }
}
