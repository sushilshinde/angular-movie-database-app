import { createAction } from '@ngrx/store';
import { Movie } from '../models/movies.modal';

export const getAllMoviesDetails = createAction(
  '[All Movies] get ALl movies'
);
