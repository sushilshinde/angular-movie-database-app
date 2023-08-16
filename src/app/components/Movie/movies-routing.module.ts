import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './movie-categories/category-list/category-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesComponent } from './movies.component';

const routes: Routes = [
  {
    path: 'category-list',
    component: CategoryListComponent,
  },
  {
    path: '',
    component: MoviesComponent,
    children: [
      {
        path: '',
        component: MoviesListComponent,
      },
      {
        path: ':id',
        component: MovieDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
