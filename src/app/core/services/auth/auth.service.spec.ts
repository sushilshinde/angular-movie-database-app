import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Store, StoreModule } from '@ngrx/store';
import { UserDataService } from '../userData.service';
import { updateActiveUser, updateUsers } from '../../actions/user.actions';
import { User } from '../../interface/user.interface';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let userDataService: UserDataService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
      providers: [AuthService, UserDataService],
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    userDataService = TestBed.inject(UserDataService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should initially have login status as false', () => {
    authService.loginInfo$.subscribe((loginStatus) => {
      expect(loginStatus).toBe(false);
    });
  });

  it('should set login status when updateLoginStatus is called', () => {
    authService.updateLoginStatus(true);
    authService.loginInfo$.subscribe((loginStatus) => {
      expect(loginStatus).toBe(true);
    });
  });

  it('should return false for isAuthenticated initially', () => {
    const isAuthenticated = authService.isAuthenticated();
    expect(isAuthenticated).toBe(false);
  });

  it('should return false for isAuthenticated after logout', () => {
    authService.logout();
    const isAuthenticated = authService.isAuthenticated();
    expect(isAuthenticated).toBe(false);
  });

  // Add more test cases as needed for your specific use cases

  afterEach(() => {
    httpMock.verify();
  });
});
