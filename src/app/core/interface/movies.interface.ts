//creating the movie model interface present we are using json data 
export interface Movie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  rating: number;
  overview: string;
  poster_path: string;
  media_type: string;
  release_date: string;
}