import { createReducer, on } from '@ngrx/store';
import {
  RemoveToFavoriteList,
  addToFavoriteList,
  removeActiveUser,
  updateActiveUser,
  updateUsers,
} from '../actions/user.actions';
import { User } from '../interface/user.interface';

const initialState: { users: User[]; activeUser: any } = {
  users: JSON.parse(localStorage.getItem('usersData') || '[]') || [],
  activeUser: JSON.parse(localStorage.getItem('user') || '{}') || {},
};

export const usersReducer = createReducer(
  initialState,
  on(updateUsers, (state, action) => {
   
    return {
      ...state,
      users: action.users,
    };
  }),
  on(updateActiveUser, (state, action) => {
    return {
      ...state,
      activeUser: action.user,
    };
  }),
  on(removeActiveUser,(state,action)=>{
    return{
      ...state,
      activeUser:{}
    }
  }),
  on(addToFavoriteList, (state, action) => {
    let newUsers: User[] | any = [...state.users];
    let newActiveUser: User | any = { ...state.activeUser };

    if (state.users.length > 0) {
      newUsers = state.users.map((user) => {
        if (user.email === state.activeUser.email) {
          const fav_list: number[] = user?.favorite_list || [];
          if (!fav_list.includes(<number>action.movieId)) {
            newActiveUser = {
              ...newActiveUser,
              favorite_list: [...(user?.favorite_list || []), action.movieId],
            };
            return {
              ...user,
              favorite_list: [...(user?.favorite_list || []), action.movieId],
            };
          }
          return user;
        }
        return user;
      });
    }

    // update favorite list for usersData in local storage

    localStorage.setItem('usersData', JSON.stringify(newUsers));
    // update favorite list for active user in local storage
    localStorage.setItem('user', JSON.stringify(newActiveUser));
    return {
      ...state,
      users: newUsers,
      activeUser: newActiveUser,
    };
  }),
  on(RemoveToFavoriteList, (state, action) => {
    let newUsers: User[] | any = [...state.users];
    let newActiveUser: User | any = { ...state.activeUser };

    const movieIdToRemove = action.movieId;
    newUsers = state.users.map((user) => {
      if (user.email === state.activeUser.email) {
        const fav_list = user.favorite_list || [];
        const updatedFavoriteList = fav_list.filter(
          (movie) => movie !== movieIdToRemove
        );
        return {
          ...user,
          favorite_list: updatedFavoriteList,
        };
      }
      return user;
    });

    newActiveUser = {
      ...state.activeUser,
      favorite_list:
        newUsers.find((user: any) => user.email === state.activeUser.email)
          ?.favorite_list || [],
    };

    // update favorite list for usersData in local storage

    localStorage.setItem('usersData', JSON.stringify(newUsers));
    // update favorite list for active user in local storage
    localStorage.setItem('user', JSON.stringify(newActiveUser));
    return {
      ...state,
      users: newUsers,
      activeUser: newActiveUser,
    };
  })
);
