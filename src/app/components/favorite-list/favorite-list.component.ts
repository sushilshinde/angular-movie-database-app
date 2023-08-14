import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MovieDetailsModel } from 'src/app/core/interface/movie.interface';
import { User } from 'src/app/core/interface/user.interface';

/* The FavoriteListComponent is a TypeScript component that retrieves the favorite movies of a user
from a store and displays them. */
@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit, OnDestroy{
  myFavorites: MovieDetailsModel[] = [];
  user?: User;
  userStoreSubscription?: Subscription;
  movieStoreSubscripption?: Subscription; 

  constructor(private store: Store<{ users: { activeUser: any } , movies: { movies: MovieDetailsModel[] }}>) {}

  ngOnInit(): void {

      this.userStoreSubscription = this.store.select('users').subscribe(userStore => {
        let movieIds = userStore.activeUser?.favorite_list || [];

        if(movieIds && movieIds.length > 0){
          this.movieStoreSubscripption = this.store.select('movies').subscribe(movieStore => {
            const favMovies = movieStore.movies.filter(movie => movieIds.includes(movie.id))
            this.myFavorites = favMovies
          })
        }

    })

    console.log(this.myFavorites)
  }

  ngOnDestroy(): void {
    this.userStoreSubscription?.unsubscribe();
    this.movieStoreSubscripption?.unsubscribe();
  }

}
