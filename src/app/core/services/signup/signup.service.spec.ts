import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { SignupService } from './signup.service';

describe('Service: Signup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignupService],
      imports: [
        HttpClientModule,
        StoreModule.forRoot({}) 
      ]
    });
  });

  it('should ...', () => {
    const service: SignupService = TestBed.inject(SignupService);
    expect(service).toBeTruthy();
  });
});
