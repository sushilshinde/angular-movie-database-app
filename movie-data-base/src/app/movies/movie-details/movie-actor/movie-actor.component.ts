import { Component, Input } from '@angular/core';
import { CreditModel } from 'src/app/models/credit.model';

@Component({
  selector: 'app-movie-actor',
  templateUrl: './movie-actor.component.html',
  styleUrls: ['./movie-actor.component.css']
})
export class MovieActorComponent {
  @Input() credit?: CreditModel;
}
