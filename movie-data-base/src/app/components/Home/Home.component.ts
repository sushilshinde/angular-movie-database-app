import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/core/models/movies.modal';
import { MovieMyService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
})
export class HomeComponent implements OnInit {
  allmovies: Movie[] = [];
  sortMethod: string = 'Title(A-Z)';

  constructor(private movieService: MovieMyService, private router: Router) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.allmovies = data.movies;
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

  changeRouting(movieId: number, media_type: string) {
    if (media_type === 'movie') {
      this.router.navigate(['/movie', movieId]);
    } else if (media_type === 'tv') {
      this.router.navigate(['/tv', movieId]);
    }
  }
}
