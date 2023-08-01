import { createAction, props } from "@ngrx/store";

export const getMovieDetails = createAction('[movies] get movie details', props<{id: number}>())