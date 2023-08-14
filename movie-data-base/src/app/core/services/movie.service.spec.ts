import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MovieMyService } from './movie.service';
import { Movie } from '../interface/movies.interface';

// Import the JSON data directly
import moviesData from '../../../assets/Moviesdata.json';

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

  it('should retrieve movies from the API via GET', () => {
    const dummyMovies: Movie[] = moviesData.movies;

    service.getMovies().subscribe((moviesResponse) => {
      expect(moviesResponse.movies).toBeTruthy();
      expect(moviesResponse.movies).toEqual(dummyMovies);
    });

    const request = httpMock.expectOne('../../../assets/Moviesdata.json');
    expect(request.request.method).toBe('GET');
    request.flush(moviesData);

    httpMock.verify();
  });
});
