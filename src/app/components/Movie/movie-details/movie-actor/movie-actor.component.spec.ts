import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActorModel } from 'src/app/core/interface/movie-actor.interface';

import { MovieActorComponent } from './movie-actor.component';

describe('MovieActorComponent', () => {
  let component: MovieActorComponent;
  let fixture: ComponentFixture<MovieActorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieActorComponent]
    });
    fixture = TestBed.createComponent(MovieActorComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an input actor', () => {
    const actor: ActorModel = {
      name: "Jackie Chan",
      profile_path: "https://www.themoviedb.org/t/p/w440_and_h660_face/nraZoTzwJQPHspAVsKfgl3RXKKa.jpg"
    };

    component.credit = actor;

    fixture.detectChanges()

    expect(component.credit).toEqual(actor);
  });
});
