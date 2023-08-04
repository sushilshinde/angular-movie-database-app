import { CreditModel } from "./credit.model";
import { RatingModel } from "./rating.model";

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
  details: {
    runtime: number;
    tagline: string;
    genres: {id: number, name: string}[]
  };
  credits: CreditModel[];
}
