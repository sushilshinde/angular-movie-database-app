import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MovieService } from 'src/app/core/services/movie.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Movie } from 'src/app/core/models/movie.modal';
@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
})
export class MoviesListComponent implements OnInit {

  moviedata: Movie[] = [];
 

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe({
      next: (data) => {
      
        this.moviedata = data.movies.filter((each)=>each.media_type==="movie");
      

        
      },
      error: (error) => {
        console.log(error);
      },
    });
   
    

    
  }
}
