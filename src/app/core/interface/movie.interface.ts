<<<<<<< HEAD
import { CreditModel } from './credit.interface';
import { RatingModel } from './rating.interface';

export interface MovieModel {
  ratings: RatingModel[];
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
=======
import { ActorModel } from './movie-actor.interface';
import { Movie } from './movies.interface';
import { RatingModel } from './rating.interface';

/* The code is defining an interface called `MovieModel` */
export interface MovieDetailsModel extends Movie{
  ratings: RatingModel[];
>>>>>>> aswathi_s
  details: {
    runtime: number;
    tagline: string;
    genres: { id: number; name: string }[];
  };
<<<<<<< HEAD
  credits: CreditModel[];
=======
  credits: ActorModel[]
>>>>>>> aswathi_s
}
