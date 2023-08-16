import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { addReview } from 'src/app/core/actions/movies.actions';
import { MovieDetailsModel } from 'src/app/core/interface/movie.interface';
import { Subscription } from 'rxjs'

/* The `MovieRatingFormComponent` class is a TypeScript component that handles the form for rating and
reviewing movies. */
@Component({
  selector: 'app-movie-rating-form',
  templateUrl: './movie-rating-form.component.html',
  styleUrls: ['./movie-rating-form.component.css'],
})
export class MovieRatingFormComponent implements OnInit, OnDestroy {
  userStoreSubscriber?: Subscription;
  @Input() movieId!: number;
  reviewForm!: FormGroup;
  rating: number = 0;
  activeUser: boolean = false;
  username: string = '';
  constructor(
    private store: Store<{ movies: { movies: MovieDetailsModel[] },  users: { activeUser: any } }>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userStoreSubscriber = this.store.select('users').subscribe(userStore => {
      this.activeUser = userStore.activeUser?.username ? true : false;
      this.username = userStore.activeUser?.username
    })
    this.reviewForm = new FormGroup({
      comment: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

/**
 * The getRating function sets the rating property of the object to the provided value.
 * @param {number} rating - The parameter "rating" is a number that represents the rating value.
 */
  getRating(rating: number) {
    this.rating = rating;
  }

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
    
    this.snackBar.open('You rated ' + this.rating + ' / ' + 5, '', {
      duration: 5000,
    });
  }

  ngOnDestroy(): void {
    this.userStoreSubscriber?.unsubscribe()
  }
}
