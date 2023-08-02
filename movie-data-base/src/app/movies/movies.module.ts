import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { StoreModule } from '@ngrx/store';
import { moviesReducer } from '../reducers/movies.reducers';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { MovieActorComponent } from './movie-details/movie-actor/movie-actor.component';
import { CommonModule } from '@angular/common';
import { MovieReviewComponent } from './movie-details/movie-review/movie-review.component';
import { MovieRatingComponent } from './movie-details/movie-rating/movie-rating.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieRatingFormComponent } from './movie-details/movie-rating-form/movie-rating-form.component';

@NgModule({
  declarations: [
    MovieDetailsComponent,
    MovieListComponent,
    MoviesComponent,
    MovieActorComponent,
    MovieReviewComponent,
    MovieRatingComponent,
    MovieRatingFormComponent,
  ],
  imports: [
    RouterModule,
    MoviesRoutingModule,
    StoreModule.forFeature('movies', moviesReducer),
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
})
export class MoviesModule {}
