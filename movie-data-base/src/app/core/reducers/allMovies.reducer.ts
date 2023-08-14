import { createReducer, on } from '@ngrx/store';
import {
  loadMovies,
  loadMoviesSuccess,
  loadMoviesFailure,
} from '../actions/allMovies.actions';
import { Movie } from '../interface/movies.interface';
import moviedata from '../../../assets/Moviesdata.json';

export interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

export const initialState: MovieState = {
  movies: moviedata.movies,
  loading: false,
  error: null,
};

export const allmovieReducer = createReducer(
  initialState,
  on(loadMovies, (state) => ({ ...state, loading: true, error: null })),
  on(loadMoviesSuccess, (state, { movies }) => ({
    ...state,
    loading: false,
    movies,
  })),
  on(loadMoviesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
