import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { NofoundComponent } from './components/nofound/nofound.component';
import { MoviesListComponent } from './components/Movie/movies-list/movies-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TvShowsComponent } from './components/TvShows/TvShows.component';
import { HomeComponent } from './components/Home/Home.component';
import { SearchComponent } from './components/Movie/search/search.component';
import { MovieSortPipe } from './shared/pipes/MovieSort.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './core/services/auth/auth.service';
import { SignupService } from './core/services/signup/signup.service';
import { SignupComponent } from './components/auth/signup/signup.component';
import { FooterComponent } from './components/footer/footer.component';
import { MoviesModule } from './components/Movie/movies.module';
import { GenreSelectDialog } from './components/Movie/movie-categories/category-select-dialog/category-select-dialog.component';
import { MovieMyService } from './core/services/movie.service';
import { TitlesOverDirective } from './shared/Directives/TitlesOver.directive';
import { allMovieReducer } from './core/reducers/allMovies.reducer';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { MovieItemComponent } from './components/favorite-list/movie-item/movie-item.component';
import { usersReducer } from './core/reducers/users.reducers';
import { MatIconModule } from '@angular/material/icon';
import { AuthGuard } from './core/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NofoundComponent,
    NavbarComponent,
    MoviesListComponent,
    TvShowsComponent,
    HomeComponent,
    SearchComponent,
    MovieSortPipe,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    TitlesOverDirective,
    FavoriteListComponent,
    MovieItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ allmovies: allMovieReducer, users: usersReducer }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MoviesModule,
    MatTooltipModule,
    MatIconModule,
    GenreSelectDialog
  ],
  providers: [AuthGuard, AuthService, SignupService, MovieMyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
