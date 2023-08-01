import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/Home/Home.component';
import { MoviesListComponent } from './Movie/movies-list/movies-list.component';
import { TvShowsComponent } from './TvShows/TvShows.component';
import { SearchComponent } from './Movie/search/search.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'movie', component: MoviesListComponent },
  { path: 'tv', component: TvShowsComponent },
  {path:'search',component:SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
