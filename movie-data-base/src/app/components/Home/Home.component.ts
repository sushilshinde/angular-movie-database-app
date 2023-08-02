import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/models/movie.modal';
import { MovieService } from 'src/app/core/services/movie.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css'],
})
export class HomeComponent implements OnInit {
  allmovies: Movie[] = [];
  sortMethod: string = 'Title(A-Z)';

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.allmovies = data.movies;
       
      },
      error: (error) => {
        console.log(error);
      },
    });
    

   
  }

  sortMovieOption(event: any) {
    //after select the sort method save to method and passing the sortMovies
    this.sortMethod = event.target.value;
   
  }

 
 
}
