import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Movie } from '../interface/movies.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AllMovieService {
  constructor(private http: HttpClient) {}
  //getting movies from json data present
  //if use api write the api in place of json location
  getMovies():Observable<Movie[]> {
    //return movies based on Movie modal interface
    return this.http.get<  Movie[] >(
      '../../../assets/Moviesdata.json'
    );
  }
}
