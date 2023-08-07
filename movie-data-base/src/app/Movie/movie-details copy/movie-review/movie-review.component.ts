import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { RatingModel } from 'src/app/core/models/rating.model';
import { DateFormatService } from 'src/app/core/services/date-format.service';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.css'],
})
export class MovieReviewComponent implements OnInit {
  @Input() review!: RatingModel;
  timestamp!: string;

  constructor(private dateService: DateFormatService) {}

  ngOnInit(): void {
    this.timestamp = this.dateService.formatDateWithTime(this.review!.date);
  }
}
