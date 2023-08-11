import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MovieModel } from 'src/app/core/interface/movie.interface';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  genre!: string;
  moviesList!: MovieModel[];
  subscription!: Subscription;
  constructor(
    private router: Router,
    private store: Store<{ movies: { movies: MovieModel[] } }>,
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
