import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCategoriesComponent } from './movie-categories.component';

describe('MovieCategoriesComponent', () => {
  let component: MovieCategoriesComponent;
  let fixture: ComponentFixture<MovieCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieCategoriesComponent]
    });
    fixture = TestBed.createComponent(MovieCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
