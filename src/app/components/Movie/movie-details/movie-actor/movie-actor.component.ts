import { Component, Input } from '@angular/core';
import { ActorModel } from 'src/app/core/interface/movie-actor.interface';

/* The MovieActorComponent is a TypeScript component that represents a movie actor and accepts an input
of type ActorModel. */
@Component({
  selector: 'app-movie-actor',
  templateUrl: './movie-actor.component.html',
  styleUrls: ['./movie-actor.component.css'],
})
export class MovieActorComponent {
  @Input() credit?: ActorModel;
}
