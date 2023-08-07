import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
