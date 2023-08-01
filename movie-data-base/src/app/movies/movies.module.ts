import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { moviesReducer } from '../reducers/movies.reducers';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { MovieActorComponent } from './movie-details/movie-actor/movie-actor.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MovieDetailsComponent,
    MovieListComponent,
    MoviesComponent,
    MovieActorComponent,
  ],
  imports: [
    RouterModule,
    MoviesRoutingModule,
    StoreModule.forFeature('movies', moviesReducer),
    CommonModule,
    MatIconModule,
  ],
})
export class MoviesModule {}
