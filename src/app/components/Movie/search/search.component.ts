/**
 * File: search.component.ts
 * Author: Venkateswara Rao samineni
 * Description:In this componet show the resuluts of serach and hanlde Resulut messages and sort method 
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from 'src/app/core/interface/movies.interface';
import { MovieMyService } from 'src/app/core/services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
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

  private subscription?: Subscription;

  constructor(
    private movieService: MovieMyService,
    private router: Router,
    private route: ActivatedRoute,
    private searchSerive: SearchService
  ) {}

  ngOnInit() {
    //getting entered text
    this.SearchText = this.searchSerive.getData();

    // Fetch movies from the service when the component initializes
    this.subscription = this.movieService.getMovies().subscribe({
      next: (data) => {
        this.MovieDatabase = data.movies;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnDestroy() {
    //unsubscribe from the subscription(s) to prevent memory leaks.
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Function to handle the selection of sorting method
  sortMovieOption(event: any) {
    // Update the selected sorting method
    this.sortMethod = event.target.value;
  }

  // Function to handle the search form submission
  onSubmitSearch() {
    console.log('button cliked');
    // Filter the movie database based on the search text
    this.searchResult = this.MovieDatabase.filter((each) =>
      each.title.toLowerCase().includes(this.SearchText?.trim().toLowerCase())
    );

    // If search results are not found, update the loading indicator
    if (this.searchResult.length === 0) {
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
