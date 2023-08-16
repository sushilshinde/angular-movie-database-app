<<<<<<< HEAD
import { TestBed } from '@angular/core/testing';
import { MovieSortPipe } from './MovieSort.pipe';
import { Movie } from 'src/app/core/interface/movies.interface';

describe('MovieSortPipe',()=>{
  let pipe:MovieSortPipe;
  beforeEach(()=>{
    TestBed.configureTestingModule({
      declarations:[MovieSortPipe],
      providers:[MovieSortPipe]
    });
    pipe=TestBed.inject(MovieSortPipe)
  });
  it('should create an instance',()=>{
    expect(pipe).toBeTruthy()
  })
  it('should return the same array if movies are not provided', () => {
    const movies: Movie[] = [];
    const result = pipe.transform(movies, 'Title(A-Z)');
    expect(result).toEqual([]);
  });

})
=======
/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { MovieSortPipe } from './MovieSort.pipe';

describe('Pipe: MovieSorte', () => {
  it('create an instance', () => {
    let pipe = new MovieSortPipe();
    expect(pipe).toBeTruthy();
  });
});
>>>>>>> aswathi_s
