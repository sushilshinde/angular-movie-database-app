import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MovieDetailsModel } from '../interface/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieMyService  {
  constructor(private http: HttpClient) {}

  // Get movies from Firebase Realtime Database
  getMovies() {
    return this.http
      .get<{ movies: MovieDetailsModel[] }>(
        'https://udemy-section-18-default-rtdb.firebaseio.com/.json'
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    // You can handle the error as per your application's requirements
    console.error('An error occurred:', error);

    // You can also customize the error message that gets propagated
    return throwError('Something went wrong. Please try again later.');
  }
}
