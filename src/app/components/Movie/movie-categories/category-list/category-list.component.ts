import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MovieDetailsModel } from 'src/app/core/interface/movie.interface';

/* The CategoryListComponent is a TypeScript component that filters and displays a list of movies based
on a selected genre. */
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  genre!: string;
  moviesList!: MovieDetailsModel[];
  subscription!: Subscription;
  constructor(
    private router: Router,
    private store: Store<{ movies: { movies: MovieDetailsModel[] } }>,
    private route: ActivatedRoute
  ) {
    this.subscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        if (
          this.genre !==
          this.router.getCurrentNavigation()?.extras.state?.['genre']
        ) {
          this.genre =
            this.router.getCurrentNavigation()?.extras.state?.['genre'];
          this.filterMovies();
        }
      }
    });
  }

  ngOnInit(): void {
    if (!this.genre) {
      this.router.navigate(['/movies']);
    }

    this.filterMovies();
  }

  /**
   * The function filters a list of movies based on a specific genre and stores the filtered movies in
   * a variable.
   */
  private filterMovies() {
    this.store.select('movies').subscribe((movies) => {
      this.moviesList = movies.movies.filter((movie) => {
        if (movie.details.genres.find((genre) => genre.name === this.genre)) {
          return true;
        }
        return false;
      });
      console.log(this.moviesList);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
