import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MovieService } from '../../services/movie.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MovieModel } from '../../models/movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MoviesListComponent implements OnInit {
  moviedata: MovieModel[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.moviedata = data.movies.filter(
          (each) => each.media_type === 'movie'
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  gotoDetailPage(movieId: number) {
    this.router.navigate(['/movies', movieId]);
  }
}
