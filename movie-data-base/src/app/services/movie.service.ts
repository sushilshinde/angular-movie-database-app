// movie.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { MovieModel } from '../models/movie.model';
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get<{ movies: MovieModel[] }>(
      '../../../assets/Moviesdata.json'
    );
  }
}
