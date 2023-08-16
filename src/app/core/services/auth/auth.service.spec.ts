/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { usersReducer } from '../../reducers/users.reducers';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Auth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
<<<<<<< HEAD
      imports:[HttpClientModule]
=======
      imports: [StoreModule.forFeature('users', usersReducer )]
>>>>>>> aswathi_s
    });
  });

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
