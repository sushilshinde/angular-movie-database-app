import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { MovieModel } from '../models/movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.css']
})
export class TvshowsComponent implements OnInit{
  tvdata: MovieModel[] = [];

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
    this.router.navigate(['/movies', tvId]);
  }
}
