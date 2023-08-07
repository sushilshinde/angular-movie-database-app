import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MovieMyService } from 'src/app/core/services/movie.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Movie } from 'src/app/core/models/movies.modal';
import { Router } from '@angular/router';
@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent implements OnInit {
  moviedata: Movie[] = [];

  constructor(private movieService: MovieMyService, private router: Router) {}

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
  //detail page handler
  gotoDetailPage(movieId: number) {
    //passing the movie to routing path and get with params and get method for the partical movie details
    this.router.navigate(['/movie', movieId]);
  }
}
