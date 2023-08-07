import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { Movie } from '../models/movies.modal';
@Injectable({
  providedIn: 'root',
})
export class MovieMyService {
  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get<{ movies: Movie[] }>(
      '../../../assets/Moviesdata.json'
    );
  }
}
