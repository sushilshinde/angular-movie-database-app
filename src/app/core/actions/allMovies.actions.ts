<<<<<<< HEAD

import { createAction, props } from '@ngrx/store';
import { Movie } from './../interface/movies.interface';
export const loadMovies = createAction('[Movie] Load Movies');
export const loadMoviesSuccess = createAction('[Movie] Load Movies Success', props<{ movies: Movie[] }>());
export const loadMoviesFailure = createAction('[Movie] Load Movies Failure', props<{ error: string }>());
=======
import { createAction } from '@ngrx/store';

export const getAllMoviesDetails = createAction('[All Movies] get ALl movies');
>>>>>>> aswathi_s
