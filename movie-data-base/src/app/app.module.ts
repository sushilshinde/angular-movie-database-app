import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { NofoundComponent } from './components/nofound/nofound.component';
import { MoviesListComponent } from './Movie/movies-list/movies-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TvShowsComponent } from './TvShows/TvShows.component';
import { HomeComponent } from './components/Home/Home.component';
import { SearchComponent } from './Movie/search/search.component';
import { MovieSortPipe } from './shared/pipes/MovieSort.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './core/services/auth/auth.service';
import { SignupService } from './core/services/signup/signup.service';
import { SignupComponent } from './components/auth/signup/signup.component';
import { FooterComponent } from './components/footer/footer.component';
import { MoviesModule } from './Movie/movies.module';
import { DialogOverviewExample } from './Movie/movie-categories/category-select-dialog/category-select-dialog.component';
import { MovieMyService } from './core/services/movie.service';
import { MovieService } from './core/services/movies.service';
import { DateFormatService } from './core/services/date-format.service';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MoviesModule,
    DialogOverviewExample,
  ],
  providers: [
    AuthService,
    SignupService,
    MovieService,
    DateFormatService,
    MovieMyService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
