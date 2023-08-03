import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/Home/Home.component';
import { MoviesListComponent } from './Movie/movies-list/movies-list.component';
import { TvShowsComponent } from './TvShows/TvShows.component';
import { SearchComponent } from './Movie/search/search.component';
import { MovieDetailsComponent } from './Movie/movie-details/movie-details.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'movie', component: MoviesListComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'tv', component: TvShowsComponent },
  { path: 'tv/:id', component: MovieDetailsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
