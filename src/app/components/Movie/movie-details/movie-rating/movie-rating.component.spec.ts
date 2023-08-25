import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

import { MovieRatingComponent } from './movie-rating.component';

describe('MovieRatingComponent', () => {
  let component: MovieRatingComponent;
  let fixture: ComponentFixture<MovieRatingComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [MovieRatingComponent],
      imports: [MatIconModule]
    }).compileComponents()
    // fixture = TestBed.createComponent(MovieRatingComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set default rating to 1 if not provided', () => {
    component.ngOnInit();
    expect(component.rating).toBe(1);
  });

  it('should set provided rating', () => {
    component.rating = 3;
    component.ngOnInit();
    expect(component.rating).toBe(3);
  });

  it('should emit ratingUpdated event on click if editable', () => {
    component.editable = true;
    spyOn(component.ratingUpdated, 'emit');
    component.onClick(4);
    expect(component.ratingUpdated.emit).toHaveBeenCalledWith(4);
  });

  it('should not emit ratingUpdated event on click if not editable', () => {
    component.editable = false;
    spyOn(component.ratingUpdated, 'emit');
    component.onClick(2);
    expect(component.ratingUpdated.emit).not.toHaveBeenCalled();
  });

  it('should show star icons based on rating', () => {
    component.rating = 3;
    fixture.detectChanges();

    const starIcons = fixture.debugElement.queryAll(By.css('.material-icons'));
    expect(starIcons.length).toBe(component.starCount);

    // Check whether the first 3 icons are 'star' and the rest are 'star_border'
    for (let i = 0; i < component.starCount; i++) {
      const iconClass = starIcons[i].nativeElement.textContent.trim();
      if (i < component.rating) {
        expect(iconClass).toBe('star');
      } else {
        expect(iconClass).toBe('star_border');
      }
    }
  });

});
