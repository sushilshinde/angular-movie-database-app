import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

import { NotAuthGuard } from './not-auth.guard';

describe('NotAuthGuard', () => {
  let guard: NotAuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotAuthGuard,
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router },
      ],
    });
    guard = TestBed.inject(NotAuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when the user is not authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    const canActivate = guard.canActivate();

    expect(canActivate).toBeTruthy();
  });

  it('should redirect to /home when the user is authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    const navigateSpy = spyOn(router, 'navigate');
    const canActivate = guard.canActivate();

    expect(canActivate).toBeFalsy();
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });
});

// MockAuthService and MockRouter can be used to create mock objects for testing
class MockAuthService {
  isAuthenticated() {
    // Implement your mock behavior here
    return false;
  }
}
