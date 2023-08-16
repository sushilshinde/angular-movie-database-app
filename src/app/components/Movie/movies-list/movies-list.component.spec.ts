import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MoviesListComponent } from './movies-list.component';
import { MovieMyService } from 'src/app/core/services/movie.service';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesListComponent],
      imports:[HttpClientModule],
      providers:[MovieMyService],
    
    });
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
