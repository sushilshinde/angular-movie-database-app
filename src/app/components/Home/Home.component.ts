/**
 * File: Home.component.ts
 * Author: Venkateswara Rao samineni
 * Description: In this component Showing the all Movies and Tv shows based on user Click navigate the Paths
 * sort Method also wrok
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getAllMoviesDetails } from 'src/app/core/actions/allMovies.actions';
import { Movie } from 'src/app/core/interface/movies.interface';
import { MovieMyService } from 'src/app/core/services/movie.service';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  allmovies: Movie[] = [];
  sortMethod: string = 'Title(A-Z)';
  sereachText: string = '';
  private subscription?: Subscription;
  

  constructor(
    private movieService: MovieMyService,
    private router: Router,
    private store: Store,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    // Load all movies when the component initializes
    this.subscription = this.movieService.getMovies().subscribe({
      next: (data) => {
        // Store the fetched movies in the allmovies array
        this.allmovies = data.movies;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.store.dispatch(getAllMoviesDetails());
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  


  // Handle sorting option change event
  sortMovieOption(event: any) {
    // After selecting the sort method, update the sortMethod variable
    this.sortMethod = event.target.value;
  }
  sreachRouting() {
    this.router.navigate(['/search']);
    this.searchService.sendData(this.sereachText);
    this.sereachText = '';
  }

  // Navigate to the details page for the selected movie or TV show
  changeRouting(movieId: number, media_type: string) {
    if (media_type === 'movie') {
      // If the media_type is 'movie', navigate to the movie details page
      this.router.navigate(['/movie', movieId]);
    } else if (media_type === 'tv') {
      // If the media_type is 'tv', navigate to the TV show details page
      this.router.navigate(['/tv', movieId]);
    }
  }
}
