import { ActorModel } from './movie-actor.interface';
import { Movie } from './movies.interface';
import { RatingModel } from './rating.interface';

/* The code is defining an interface called `MovieModel` */
export interface MovieDetailsModel extends Movie{
  ratings: RatingModel[];
  details: {
    runtime: number;
    tagline: string;
    genres: { id: number; name: string }[];
  };
  credits: ActorModel[]
}
