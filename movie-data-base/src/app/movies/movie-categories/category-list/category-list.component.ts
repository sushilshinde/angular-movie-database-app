import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MovieModel } from 'src/app/models/movie.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{
  genre!: string;
  moviesList!: MovieModel[];
  constructor(private router: Router, private store: Store<{ movies: { movies: MovieModel[] } }>) {
    this.genre = this.router.getCurrentNavigation()?.extras.state?.['genre'];
  }

  ngOnInit(): void {
    if(!this.genre) {
      this.router.navigate(['/movies'])
    }
    this.store.select('movies').subscribe(movies => {
      this.moviesList = movies.movies.filter(movie => {
        if(movie.details.genres.find(genre => genre.name === this.genre)) {
          return true
        }
        return false
      })
      console.log(this.moviesList)
    })
  }
}