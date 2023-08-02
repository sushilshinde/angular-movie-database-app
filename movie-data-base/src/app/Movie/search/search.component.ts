import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/models/movie.modal';
import { MovieService } from './../../core/services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  MovieDatabase:Movie[]=[]
  searchResult:Movie[]=[]
  sortMethod: string = 'Title(A-Z)';
  SearchText:string=''


  constructor(private movieService:MovieService) { }

  ngOnInit() {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.MovieDatabase = data.movies;
       
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
  onSubmitSearch(){
    
   
    console.log("text",this.SearchText)
    this.searchResult=this.MovieDatabase.filter((each) =>
      each.title.toLowerCase().includes(this.SearchText?.trim().toLowerCase())
    );
    console.log(this.searchResult)
  }



}
