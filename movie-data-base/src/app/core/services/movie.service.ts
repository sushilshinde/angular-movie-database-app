// movie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { Movie } from '../models/movie.modal';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get<{ movies: Movie[] }>(
      '../../../assets/Moviesdata.json'
    );
  }
}
