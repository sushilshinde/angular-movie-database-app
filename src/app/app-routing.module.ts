import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/Home/Home.component';
import { MoviesListComponent } from './components/Movie/movies-list/movies-list.component';
import { TvShowsComponent } from './components/TvShows/TvShows.component';
import { SearchComponent } from './components/Movie/search/search.component';
import { MovieDetailsComponent } from './components/Movie/movie-details/movie-details.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { NofoundComponent } from './components/nofound/nofound.component';
import { CategoryListComponent } from './components/Movie/movie-categories/category-list/category-list.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'movie', loadChildren: () => import('../app/components/Movie/movies.module').then(m => m.MoviesModule) },
  { path: 'my-favorites', component: FavoriteListComponent, canActivate: [AuthGuard] },
  { path: 'category-list', component: CategoryListComponent },
  { path: 'tv', component: TvShowsComponent },
  { path: 'tv/:id', component: MovieDetailsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: NofoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
