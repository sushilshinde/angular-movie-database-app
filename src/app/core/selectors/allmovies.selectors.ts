
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MovieState } from '../reducers/allMovies.reducer';

export const selectMovieState = createFeatureSelector<MovieState>('allmovies');

export const selectAllMovies = createSelector(
  selectMovieState,
  (state: MovieState) => state.movies
);

export const selectMoviesLoading = createSelector(
  selectMovieState,
  (state: MovieState) => state.loading
);

export const selectMoviesError = createSelector(
  selectMovieState,
  (state: MovieState) => state.error
);
