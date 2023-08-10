import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { Movie } from '../models/movies.modal';
@Injectable({
  providedIn: 'root',
})
export class MovieMyService {
  constructor(private http: HttpClient) {}
  //getting movies from json data present
  //if use api write the api in place of json location
  getMovies() {
    //return movies based on Movie modal interface
    return this.http.get<{ movies: Movie[] }>(
      '../../../assets/Moviesdata.json'
    );
  }
}
