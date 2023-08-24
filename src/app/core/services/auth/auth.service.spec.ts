import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        StoreModule.forRoot({}) // Set up the store module (replace with your actual store configuration)
      ],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService); // Inject the AuthService
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
