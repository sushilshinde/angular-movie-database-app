export interface Movie {
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
    id: number;
    backdrop_path: string;
    budget: number;
    genres: {
      id: number;
      name: string;
    }[];
    homepage: string;
    original_title: string;
    overview: string;
    release_date: string;
    runtime: number;
    status: string;
    tagline: string;
    title: string;
    poster_path: string;
  };
  credits: {
    adult: boolean;
    gender: number;
    id: number;
    name: string;
    profile_path: string;
  }[];
}
