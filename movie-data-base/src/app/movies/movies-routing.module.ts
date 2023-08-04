import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './movie-categories/category-list/category-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MoviesComponent } from './movies.component';

const routes: Routes = [
    {
        path: 'categories',
        loadComponent: () =>
          import(
            '../movies/movie-categories/category-select-dialog/category-select-dialog.component'
          ).then((m) => m.DialogOverviewExample),
      },
      {
        path: 'category-list',
        component: CategoryListComponent
      },
  {
    path: '',
    component: MoviesComponent,
    children: [
      {
        path: '',
        component: MovieListComponent,
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
