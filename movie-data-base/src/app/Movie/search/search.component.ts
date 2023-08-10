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
  // Array to store the list of movies from the database
  MovieDatabase: Movie[] = [];
  // Array to store the search results
  searchResult: Movie[] = [];
  // Selected sorting method
  sortMethod: string = 'Title(A-Z)';
  // Text input for the search
  SearchText: string = '';
  // Loading indicator
  loading: boolean = true;

  constructor(
    private movieService: MovieMyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Fetch movies from the service when the component initializes
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.MovieDatabase = data.movies;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // Function to handle the selection of sorting method
  sortMovieOption(event: any) {
    // Update the selected sorting method
    this.sortMethod = event.target.value;
  }

  // Function to handle the search form submission
  onSubmitSearch() {
    // Filter the movie database based on the search text
    this.searchResult = this.MovieDatabase.filter((each) =>
      each.title.toLowerCase().includes(this.SearchText?.trim().toLowerCase())
    );

    // If search results are found, update the loading indicator
    if (this.searchResult.length !== 0) {
      this.loading = false;
    }

    // Update the route's query parameter with the search text
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { query: this.SearchText }, // Add the search query to the route's query parameter
      queryParamsHandling: 'merge', // Use 'merge' to retain existing query params
    });
  }

  // Function to navigate to the detail page of a movie or TV show
  detailPage(id: number, type: string) {
    if (type === 'movie') {
      this.router.navigate(['/movie', id]);
    } else if (type === 'tv') {
      this.router.navigate(['/tv', id]);
    }
  }
}
