import { Component, OnInit } from '@angular/core';
import { MovieMyService } from '../core/services/movie.service';
import { Movie } from '../core/models/movies.modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-TvShows',
  templateUrl: './TvShows.component.html',
  styleUrls: ['./TvShows.component.css'],
})
export class TvShowsComponent implements OnInit {
  // Array to store TV show data
  tvdata: Movie[] = [];

  // Inject the MovieMyService and Router into the component
  constructor(private movieService: MovieMyService, private router: Router) {}

  // This method is automatically called when the component is initialized
  ngOnInit() {
    // Call the getMovies method from the service and subscribe to the observable
    this.movieService.getMovies().subscribe({
      // This part executes when data is successfully retrieved
      next: (data) => {
        // Filter the received movies to include only those with media_type 'tv'
        this.tvdata = data.movies.filter((each) => each.media_type === 'tv');
      },
      // This part executes when there's an error in fetching the data
      error: (error) => {
        console.log(error); // Log the error to the console
      },
    });
  }

  // Method to navigate to the detail page of a TV show
  gotoDetailPage(tvId: number) {
    this.router.navigate(['/tv', tvId]); // Navigate to '/tv/:id' route
  }
}