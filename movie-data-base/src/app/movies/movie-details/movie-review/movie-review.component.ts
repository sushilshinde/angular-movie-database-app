import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { RatingModel } from 'src/app/models/rating.model';
import { DateFormatService } from 'src/app/services/date-format.service';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.css']
})
export class MovieReviewComponent implements OnInit{
  @Input() review!: RatingModel;
  timestamp!: string;

  constructor(private dateService: DateFormatService) {}

  ngOnInit(): void {
  this.timestamp = this.dateService.formatDateWithTime(this.review!.date);
  }
  
}
