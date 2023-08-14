import { Component, Input, Output, EventEmitter } from '@angular/core';

/* The MovieRatingComponent class is a TypeScript component that allows users to rate movies by
displaying stars and emitting an event when the rating is updated. */
@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.css']
})
export class MovieRatingComponent {
  @Input() editable: boolean = false;
  @Input('rating') rating?: number = 1;
  @Input('starCount') private starCount: number = 5;
  @Output() private ratingUpdated = new EventEmitter();
  @Input('color') color: string = 'accent';

  ratingArr: number[] = [];

  ngOnInit() {
    this.rating = !this.rating ? 1 : this.rating;
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  /**
   * The onClick function updates the rating if the component is editable and emits the updated rating.
   * @param {number} rating - The rating parameter is a number that represents the selected rating
   * value.
   */
  onClick(rating:number) {
    if(this.editable) {
      this.rating = rating;
      this.ratingUpdated.emit(rating);
    }
  }

  /**
   * The function returns 'star' if the rating is greater than or equal to the index + 1, otherwise it
   * returns 'star_border'.
   * @param {number} index - The index parameter is a number that represents the position of the icon
   * in a list or array.
   * @returns either 'star' or 'star_border' based on the condition.
   */
  showIcon(index:number) {
    if (this.rating && this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

}
