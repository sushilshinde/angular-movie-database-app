import { createAction, props } from "@ngrx/store";
import { RatingModel } from "../models/rating.model";

export const getMovieDetails = createAction('[movies] get movie details', props<{id: number}>())
export const addReview = createAction('[movies] add review', props<{review: RatingModel, movieId?: number }>())