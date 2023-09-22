import { TestBed } from '@angular/core/testing';
import { UserDataService } from './userData.service';
import { User } from '../interface/user.interface';
describe('UserDataService', () => {
  let userDataService: UserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDataService],
    });
    userDataService = TestBed.inject(UserDataService); // Get an instance of UserDataService from TestBed
  });

  it('should be created', () => {
    expect(userDataService).toBeTruthy();
  });

  it('should initially have userData$ as null', (done) => {
    userDataService.userData$.subscribe((userData) => {
      expect(userData).toBeNull();
      done();
    });
  });

  it('should set userData$ when setUserData is called', (done) => {
    const testUser: User = {
      username: 'venki',
      email: 'venki@gmail.com',
      password: 'user1234',
    };

    userDataService.setUserData(testUser);

    userDataService.userData$.subscribe((userData) => {
      expect(userData).toEqual(testUser);
      done();
    });
  });
});
