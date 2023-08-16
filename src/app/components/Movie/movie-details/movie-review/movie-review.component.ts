import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { RatingModel } from 'src/app/core/interface/rating.interface';

/* The MovieReviewComponent class is a TypeScript component that displays a movie review and formats
the review's date using the DateFormatService. */
@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.css'],
})
export class MovieReviewComponent{
  @Input() review!: RatingModel;

  constructor() {}
}
