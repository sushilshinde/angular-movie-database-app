import { Component, Input } from '@angular/core';
<<<<<<< HEAD
import { CreditModel } from 'src/app/core/interface/credit.interface';

=======
import { ActorModel } from 'src/app/core/interface/movie-actor.interface';

/* The MovieActorComponent is a TypeScript component that represents a movie actor and accepts an input
of type ActorModel. */
>>>>>>> aswathi_s
@Component({
  selector: 'app-movie-actor',
  templateUrl: './movie-actor.component.html',
  styleUrls: ['./movie-actor.component.css'],
})
export class MovieActorComponent {
<<<<<<< HEAD
  @Input() credit?: CreditModel;
=======
  @Input() credit?: ActorModel;
>>>>>>> aswathi_s
}
