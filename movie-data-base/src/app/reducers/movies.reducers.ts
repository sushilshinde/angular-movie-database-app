import { createReducer } from '@ngrx/store';
import data from '../movies/data.json';

export interface CreditModel {
  name: string;
  profile_path: string;
}

export interface MovieModel {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  release_date: string;
  details: {
    runtime: number;
    tagline: string;
  };
  credits: CreditModel[];
}

const initialState: { movies: MovieModel[] } = {
  movies: data.movies,
};

export const moviesReducer = createReducer(initialState);
