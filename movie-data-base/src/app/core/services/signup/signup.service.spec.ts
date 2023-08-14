/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SignupService } from './signup.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Signup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignupService],
      imports:[HttpClientModule]
    });
  });

  it('should ...', inject([SignupService], (service: SignupService) => {
    expect(service).toBeTruthy();
  }));
});
