import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { of } from 'rxjs'; // Import 'of' from RxJS
import { FormsModule } from '@angular/forms'; // Import FormsModule if needed
import { HttpClientModule } from '@angular/common/http';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ HttpClientModule, FormsModule ], // Add necessary imports
      providers: [
        {
          provide: ActivatedRoute, // Provide ActivatedRoute mock
          useValue: {
            snapshot: {
              paramMap: {
                get: (param: string) => 'some-value' // Mocked paramMap
              }
            }
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
