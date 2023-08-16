<<<<<<< HEAD
import { Component, OnInit, Input } from '@angular/core';
=======
import { Component, OnInit, OnDestroy,Input } from '@angular/core';
>>>>>>> aswathi_s
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { addReview } from 'src/app/core/actions/movies.actions';
<<<<<<< HEAD
import { MovieModel } from 'src/app/core/interface/movie.interface';

=======
import { MovieDetailsModel } from 'src/app/core/interface/movie.interface';
import { Subscription } from 'rxjs'

/* The `MovieRatingFormComponent` class is a TypeScript component that handles the form for rating and
reviewing movies. */
>>>>>>> aswathi_s
@Component({
  selector: 'app-movie-rating-form',
  templateUrl: './movie-rating-form.component.html',
  styleUrls: ['./movie-rating-form.component.css'],
})
<<<<<<< HEAD
export class MovieRatingFormComponent implements OnInit {
  @Input() movieId!: number;
  reviewForm!: FormGroup;
  rating: number = 0;
  constructor(
    private store: Store<{ movies: { movies: MovieModel[] } }>,
=======
export class MovieRatingFormComponent implements OnInit, OnDestroy {
  userStoreSubscriber?: Subscription;
  @Input() movieId!: number;
  reviewForm!: FormGroup;
  rating: number = 0;
  activeUser: boolean = false;
  username: string = '';
  constructor(
    private store: Store<{ movies: { movies: MovieDetailsModel[] },  users: { activeUser: any } }>,
>>>>>>> aswathi_s
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
<<<<<<< HEAD
=======
    this.userStoreSubscriber = this.store.select('users').subscribe(userStore => {
      this.activeUser = userStore.activeUser?.username ? true : false;
      this.username = userStore.activeUser?.username
    })
>>>>>>> aswathi_s
    this.reviewForm = new FormGroup({
      comment: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

<<<<<<< HEAD
=======
/**
 * The getRating function sets the rating property of the object to the provided value.
 * @param {number} rating - The parameter "rating" is a number that represents the rating value.
 */
>>>>>>> aswathi_s
  getRating(rating: number) {
    this.rating = rating;
  }

<<<<<<< HEAD
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
=======
/**
 * The submitReview function dispatches an action to add a review to the store and displays a snackbar
 * message with the rating.
 */
  submitReview() {
      this.store.dispatch(
        addReview({
          review: {
            name: this.username,
            rating: this.rating,
            comment: this.reviewForm.value.comment,
            date: new Date().toLocaleString(),
          },
          movieId: this.movieId,
        })
      );
    
>>>>>>> aswathi_s
    this.snackBar.open('You rated ' + this.rating + ' / ' + 5, '', {
      duration: 5000,
    });
  }
<<<<<<< HEAD
=======

  ngOnDestroy(): void {
    this.userStoreSubscriber?.unsubscribe()
  }
>>>>>>> aswathi_s
}
