import { createReducer, on } from '@ngrx/store';
import { addToFavoriteList, updateActiveUser, updateUsers } from '../actions/user.actions';
import { User } from '../interface/user.interface';

const initialState: { users: User[], activeUser:any } = {
    users:  JSON.parse(localStorage.getItem('usersData') || '[]') || [],
    activeUser: JSON.parse(localStorage.getItem('user') || '{}') || {}
};

export const usersReducer = createReducer(
    initialState,
    on(updateUsers, (state, action) => {
        return {
            ...state,
            users: action.users
        }
    }),
    on(updateActiveUser, (state, action) => {
        return {
            ...state,
            activeUser: action.user
        }
    }),
    on(addToFavoriteList, (state, action) => {
        let newUsers : User[] | any = [...state.users];
        let newActiveUser: User | any = {...state.activeUser}

        console.log(state.users)
       if(state.users.length > 0) {
        console.log(state.users, state.activeUser, action.movieId)

        newUsers =  state.users.map(user => {
            if(user.email === state.activeUser.email) {
                console.log(user.email, state.activeUser)
                const fav_list: number[] = user?.favorite_list || [];
                if(!fav_list.includes(<number>action.movieId)) {
                    console.log('checked!')
                    newActiveUser = {...newActiveUser, favorite_list: [ ...user?.favorite_list || [], action.movieId]} 
                    return {...user, favorite_list: [ ...user?.favorite_list || [], action.movieId]} 
                }
                return user
            }
            return user;
        })
       }

       // update favorite list for usersData in local storage
       localStorage.setItem('usersData', JSON.stringify(newUsers));
       // update favorite list for active user in local storage
       localStorage.setItem('user', JSON.stringify(newActiveUser));
        return {
            ...state,
            users: newUsers,
            activeUser: newActiveUser
        }
    })
);