import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesListComponent } from './movies-list.component';
import { MovieMyService } from 'src/app/core/services/movie.service';
import { of, throwError } from 'rxjs';
import { MovieDetailsModel } from 'src/app/core/interface/movie.interface';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
  let movieService: jasmine.SpyObj<MovieMyService>;
  let router: Router;

  beforeEach(() => {
    movieService = jasmine.createSpyObj('MovieMyService', ['getMovies']);

    TestBed.configureTestingModule({
      declarations: [MoviesListComponent],
      providers: [{ provide: MovieMyService, useValue: movieService }],
      imports: [RouterTestingModule],
    });

    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should load movies successfully', () => {
    const mockMovies: any[] = [
      {
        adult: false,
        backdrop_path:
          'https://www.themoviedb.org/t/p/w440_and_h660_face/4vlsYpItGVZN1UWZGqQBoCzrUSw.jpg',
        id: 1030987,
        title: 'Sympathy for the Devil',
        original_language: 'en',
        original_title: 'Sympathy for the Devil',
        overview:
          'After being forced to drive a mysterious passenger at gunpoint, a man finds himself in a high-stakes game of cat and mouse where it becomes clear that not everything is as it seems.',
        poster_path:
          'https://www.themoviedb.org/t/p/w440_and_h660_face/mLeYGSVnDymYscyjfPEfjK9GBUk.jpg',
        media_type: 'movie',
        release_date: '2023-07-20',
        details: {
          id: 1030987,
          backdrop_path:
            'https://www.themoviedb.org/t/p/w440_and_h660_face/4vlsYpItGVZN1UWZGqQBoCzrUSw.jpg',
          budget: 0,
          genres: [
            {
              id: 53,
              name: 'Thriller',
            },
          ],
          homepage: '',
          original_title: 'Sympathy for the Devil',
          overview:
            'After being forced to drive a mysterious passenger at gunpoint, a man finds himself in a high-stakes game of cat and mouse where it becomes clear that not everything is as it seems.',
          release_date: '2023-07-20',
          runtime: 90,
          status: 'Released',
          tagline: 'Revenge is a hell of a ride.',
          title: 'Sympathy for the Devil',
          poster_path:
            'https://www.themoviedb.org/t/p/w440_and_h660_face//mLeYGSVnDymYscyjfPEfjK9GBUk.jpg',
        },
        credits: [
          {
            adult: false,
            gender: 2,
            id: 234352,
            name: 'Nicolas Cage',
            profile_path:
              'https://www.themoviedb.org/t/p/w440_and_h660_face/ti2h1OS1n1VwoJHWFaJD8dMZuEE.jpg',
          },
          {
            adult: false,
            gender: 2,
            id: 234352,
            name: 'Joel Kinnaman',
            profile_path:
              'https://www.themoviedb.org/t/p/w440_and_h660_face/c4TTWy1WntzDxpgIe8kbODjWOfD.jpg',
          },
          {
            adult: false,
            gender: 0,
            id: 234352,
            name: 'Alexis Zollicoffer',
            profile_path:
              'https://www.themoviedb.org/t/p/w440_and_h660_facenull',
          },
          {
            adult: false,
            gender: 0,
            id: 234352,
            name: 'Cameron Lee Price',
            profile_path:
              'https://www.themoviedb.org/t/p/w440_and_h660_face/oSvuZp154l88FATYPGgiI7KZ3yi.jpg',
          },
          {
            adult: false,
            gender: 0,
            id: 234352,
            name: 'Oliver McCallum',
            profile_path:
              'https://www.themoviedb.org/t/p/w440_and_h660_facenull',
          },
          {
            adult: false,
            gender: 2,
            id: 234352,
            name: 'Burns Burns',
            profile_path:
              'https://www.themoviedb.org/t/p/w440_and_h660_facenull',
          },
        ],
      },
      {
        adult: false,
        backdrop_path:
          'https://www.themoviedb.org/t/p/w440_and_h660_face/57clBMPX25NNO6nmDw3TV3zQaQE.jpg',
        id: 114472,
        title: 'Secret Invasion',
        original_language: 'en',
        original_title: 'Secret Invasion',
        overview:
          'Nick Fury and Talos discover a faction of shapeshifting Skrulls who have been infiltrating Earth for years.',
        poster_path:
          'https://www.themoviedb.org/t/p/w440_and_h660_face/f5ZMzzCvt2IzVDxr54gHPv9jlC9.jpg',
        media_type: 'tv',
        release_date: '2023-06-21',
        details: {
          id: 114472,
          backdrop_path:
            'https://www.themoviedb.org/t/p/w440_and_h660_facenull',
          budget: 0,
          genres: [
            {
              id: 99,
              name: 'Documentary',
            },
          ],
          homepage: 'http://www.colonialfilm.org.uk/node/252',
          original_title: 'Daybreak in Udi',
          overview:
            'An African tribe in the Eastern Nigerian village of Umana work to build a maternity hospital, with the aid of government officials, and against the opposition of some tribal members.',
          release_date: '1949-08-15',
          runtime: 47,
          status: 'Released',
          tagline: '',
          title: 'Daybreak in Udi',
          poster_path: 'https://www.themoviedb.org/t/p/w440_and_h660_face/null',
        },
        credits: [
          {
            adult: false,
            gender: 0,
            id: 234352,
            name: 'E.R. Chadwick',
            profile_path:
              'https://www.themoviedb.org/t/p/w440_and_h660_facenull',
          },
          {
            adult: false,
            gender: 0,
            id: 234352,
            name: 'Hartford Anerobi',
            profile_path:
              'https://www.themoviedb.org/t/p/w440_and_h660_facenull',
          },
          {
            adult: false,
            gender: 0,
            id: 234352,
            name: 'Fanny Elumeze',
            profile_path:
              'https://www.themoviedb.org/t/p/w440_and_h660_facenull',
          },
          {
            adult: false,
            gender: 0,
            id: 234352,
            name: 'Oso Anibhebe',
            profile_path:
              'https://www.themoviedb.org/t/p/w440_and_h660_facenull',
          },
          {
            adult: false,
            gender: 0,
            id: 234352,
            name: 'Joseph Amalu',
            profile_path:
              'https://www.themoviedb.org/t/p/w440_and_h660_facenull',
          },
          {
            adult: false,
            gender: 0,
            id: 234352,
            name: 'Joyce MgBaronye',
            profile_path:
              'https://www.themoviedb.org/t/p/w440_and_h660_facenull',
          },
        ],
      },
    ];

    movieService.getMovies.and.returnValue(of({ movies: mockMovies }));

    fixture.detectChanges();

    expect(component.moviedata).toEqual([mockMovies[0]]);
  });

  it('should handle error when loading movies', () => {
    const errorMessage = 'An error occurred';

    movieService.getMovies.and.returnValue(throwError(errorMessage));

    spyOn(console, 'error'); // Spy on console.error to check if it's called

    fixture.detectChanges(); // Trigger ngOnInit

    expect(console.error).toHaveBeenCalledWith(
      'An error occurred while fetching movies:',
      errorMessage
    );
    expect(component.moviedata).toEqual([]); // Ensure that moviedata remains empty
  });

  it('should navigate to movie detail page with correct movieId', () => {
    const movieId = 123;
    const navigateSpy = spyOn(router, 'navigate');

    component.gotoDetailPage(movieId);

    expect(navigateSpy).toHaveBeenCalledWith(['/movie', movieId]);
  });
});
