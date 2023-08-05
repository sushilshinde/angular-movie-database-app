import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MovieSortPipe } from './pipes/MovieSort.pipe';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component';
import { TvshowsComponent } from './tvshows/tvshows.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/movies',
    pathMatch: 'full',
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./movies/movies.module').then((m) => m.MoviesModule),
  },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tv', component: TvshowsComponent },
  { path: 'search', component: SearchComponent },
];

@NgModule({
  declarations: [LoginComponent, SearchComponent, MovieSortPipe, SignupComponent],
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule, FormsModule, CommonModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
