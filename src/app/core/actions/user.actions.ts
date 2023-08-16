import { createAction, props } from '@ngrx/store';
import { User } from '../interface/user.interface';

export const updateUsers = createAction(
  '[users] update users',
  props<{ users: User[] }>()
);

export const updateActiveUser = createAction(
  '[users] update active user',
  props<{ user: User }>()
);

export const addToFavoriteList = createAction(
  '[users] add to my favorites',
  props<{ movieId: number | undefined }>()
);