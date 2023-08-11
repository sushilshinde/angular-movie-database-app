import { createReducer, on } from '@ngrx/store';
import { addReview } from '../actions/movies.actions';
import { MovieModel } from '../interface/movie.interface';
import data from '../../components/Movie/data.json';

const initialMovies = data.movies.map((movie) => ({
  ...movie,
  ratings: [
    {
      name: 'John Doe',
      rating: 4,
      comment: 'It was a good movie!',
      date: Date.now().toString(),
    },
  ],
}));

const initialState: { movies: MovieModel[] } = {
  movies: initialMovies,
};

export const moviesReducer = createReducer(
  initialState,
  on(addReview, (state, action) => {
    let newMovies = state.movies.map((movie) => {
      if (movie.id === action.movieId) {
        let newReviews = [...movie.ratings, action.review];
        return { ...movie, ratings: newReviews };
      }
      return movie;
    });

    return {
      ...state,
      movies: newMovies,
    };
  })
);
