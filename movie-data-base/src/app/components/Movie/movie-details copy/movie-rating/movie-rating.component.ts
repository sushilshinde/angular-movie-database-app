import { Component, Input, Output, EventEmitter } from '@angular/core';

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
  onClick(rating:number) {
    if(this.editable) {
      this.rating = rating;
      this.ratingUpdated.emit(rating);
    }
  }

  showIcon(index:number) {
    if (this.rating && this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

}
