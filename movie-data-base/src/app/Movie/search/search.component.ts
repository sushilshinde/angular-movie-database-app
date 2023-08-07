import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/models/movies.modal';
import { MovieMyService } from './../../core/services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  MovieDatabase: Movie[] = [];
  searchResult: Movie[] = [];
  sortMethod: string = 'Title(A-Z)';
  SearchText: string = '';
  loading: boolean = true;

  constructor(
    private movieService: MovieMyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.MovieDatabase = data.movies;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  sortMovieOption(event: any) {
    //after select the sort method save to method and passing the sortMovies
    this.sortMethod = event.target.value;
  }
  onSubmitSearch() {
    console.log('text', this.SearchText);
    this.searchResult = this.MovieDatabase.filter((each) =>
      each.title.toLowerCase().includes(this.SearchText?.trim().toLowerCase())
    );
    if (this.searchResult.length !== 0) {
      this.loading = false;
    }

    //adding query parameters
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { query: this.SearchText }, // Add the search query to the route's query parameter
      queryParamsHandling: 'merge', // Use 'merge' to retain existing query params
    });
  }
}
