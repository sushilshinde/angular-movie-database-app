import movieData from '../../../assets/Moviesdata.json';
import { createReducer, on } from '@ngrx/store';
import { getAllMoviesDetails } from '../actions/allMovies.actions';
import { Movie } from '../models/movies.modal';

const initialState: any = {
  movies: movieData.movies,
};

export const allMovieReducer = createReducer(
  initialState,
  on(getAllMoviesDetails, (state, action) => {
    return { ...state };
  })
);
