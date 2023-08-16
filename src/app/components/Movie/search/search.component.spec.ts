<<<<<<< HEAD
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { of } from 'rxjs'; // Import 'of' from RxJS
import { FormsModule } from '@angular/forms'; // Import FormsModule if needed
import { HttpClientModule } from '@angular/common/http';
=======
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
>>>>>>> aswathi_s

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
<<<<<<< HEAD
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
=======
      declarations: [ SearchComponent ]
>>>>>>> aswathi_s
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
