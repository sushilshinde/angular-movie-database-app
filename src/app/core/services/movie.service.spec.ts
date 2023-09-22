
import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { MovieMyService } from './movie.service';
import { MovieDetailsModel } from '../interface/movie.interface';

describe('MovieMyService', () => {
  let service: MovieMyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieMyService],
    });

    service = TestBed.inject(MovieMyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get movies from Firebase', () => {
    const dummyMovies: MovieDetailsModel[] = [
      // Create sample movie data here
    ];

    service.getMovies().subscribe((movies: { movies: MovieDetailsModel[] }) => {
      expect(movies.movies.length).toBe(dummyMovies.length);
      // You can add more assertions based on your specific data and expectations.
    });

    const request = httpMock.expectOne(
      'https://udemy-section-18-default-rtdb.firebaseio.com/.json'
    );
    expect(request.request.method).toBe('GET');

    // Respond with dummy data
    request.flush({ movies: dummyMovies });

    // Verify that there are no outstanding requests
    httpMock.verify();
  });
});
