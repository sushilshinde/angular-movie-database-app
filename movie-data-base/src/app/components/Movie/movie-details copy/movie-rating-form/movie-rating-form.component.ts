import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { addReview } from 'src/app/core/actions/movies.actions';
import { MovieModel } from 'src/app/core/interface/movie.interface';

@Component({
  selector: 'app-movie-rating-form',
  templateUrl: './movie-rating-form.component.html',
  styleUrls: ['./movie-rating-form.component.css'],
})
export class MovieRatingFormComponent implements OnInit {
  @Input() movieId!: number;
  reviewForm!: FormGroup;
  rating: number = 0;
  constructor(
    private store: Store<{ movies: { movies: MovieModel[] } }>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.reviewForm = new FormGroup({
      comment: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  getRating(rating: number) {
    this.rating = rating;
  }

  submitReview() {
    console.log(this.reviewForm?.value, this.rating);
    console.log(this.reviewForm);
    this.store.dispatch(
      addReview({
        review: {
          name: 'Some User',
          rating: this.rating,
          comment: this.reviewForm.value.comment,
          date: new Date().toLocaleString(),
        },
        movieId: this.movieId,
      })
    );
    this.snackBar.open('You rated ' + this.rating + ' / ' + 5, '', {
      duration: 5000,
    });
  }
}
