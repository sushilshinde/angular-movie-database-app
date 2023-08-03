import { Component, OnInit } from '@angular/core';
import { MovieService } from '../core/services/movie.service';
import { Movie } from '../core/models/movie.modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-TvShows',
  templateUrl: './TvShows.component.html',
  styleUrls: ['./TvShows.component.css'],
})
export class TvShowsComponent implements OnInit {
  tvdata: Movie[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.tvdata = data.movies.filter((each) => each.media_type === 'tv');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  gotoDetailPage(tvId: number) {
    this.router.navigate(['/tv', tvId]);
  }
}
