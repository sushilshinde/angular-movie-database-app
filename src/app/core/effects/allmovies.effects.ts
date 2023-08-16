import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as movieActions from '../actions/allMovies.actions';
import { AllMovieService } from '../services/allmovies.service';
@Injectable()
export class MovieEffects {
  constructor(
    private actions$: Actions,
    private movieService: AllMovieService
  ) {}

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(movieActions.loadMovies),
      switchMap(() =>
        this.movieService.getMovies().pipe(
          map((movies) => movieActions.loadMoviesSuccess({ movies })),
          catchError((error) =>
            of(movieActions.loadMoviesFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
