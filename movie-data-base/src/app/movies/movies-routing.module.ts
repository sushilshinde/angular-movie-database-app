import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { MovieListComponent } from "./movie-list/movie-list.component";
import { MoviesComponent } from "./movies.component";

const routes: Routes = [
    {
        path: '', 
        component: MoviesComponent,
        children: [
            {
                path: '',
                component: MovieListComponent
            },
            {
                path: ':id',
                component: MovieDetailsComponent,
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MoviesRoutingModule{}