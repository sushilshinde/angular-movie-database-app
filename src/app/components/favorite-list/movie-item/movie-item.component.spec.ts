import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MovieItemComponent } from './movie-item.component';

describe('MovieItemComponent', () => {
  let component: MovieItemComponent;
  let fixture: ComponentFixture<MovieItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieItemComponent],
      imports: [RouterTestingModule]
    });
    fixture = TestBed.createComponent(MovieItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
