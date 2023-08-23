import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { updateActiveUser } from '../../actions/user.actions';
import { User } from '../../interface/user.interface';
import { HttpClient } from '@angular/common/http';
import { UserDataService } from '../userData.service';
import { map, of, catchError } from 'rxjs';
import { updateUsers } from '../../actions/user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private activeUserSubscription?: Subscription;
  private loginStatus = new BehaviorSubject<boolean>(false);
  public loginInfo$ = this.loginStatus.asObservable(); // Observable to track login status changes
  private isAuthenticatedValue: boolean = false; // Indicates if the user is authenticated or not
  userKey?: string | null;

  constructor(
    private store: Store<{ users: { activeUser: any } }>,
    private http: HttpClient,
    private userDataService: UserDataService
  ) {
    // Check if the user is authenticated on initialization
    this.isAuthenticatedValue = this.checkAuthenticationStatus();
  }

  /**
   * The function `isActiveUser()` checks if the active user is currently active and returns a boolean
   * value indicating their status.
   * @returns The function `isActiveUser()` returns a boolean value indicating whether the user is
   * active or not.
   */
  isActiveUser(): boolean {
    let isActive: boolean = false;
    this.activeUserSubscription = this.store
      .select('users')
      .subscribe((userStore) => {
        if (userStore.activeUser?.username) {
          isActive = true;
        } else {
          isActive = false;
        }
      });
    return isActive;
  }

  // Method to update the login status using the BehaviorSubject
  updateLoginStatus(status: boolean) {
    this.loginStatus.next(status);
  }

  // Method to check if the user is authenticated or not
  isAuthenticated(): boolean {
    return this.isAuthenticatedValue;
  }

  // Method to perform the login action with provided email and password
  login(email: string, password: string): Observable<boolean> {
    return this.http
      .get('https://udemy-section-18-default-rtdb.firebaseio.com/.json')
      .pipe(
        map((data: any) => {
          // Check if the user data is available on Firebase
          if (data && data.users) {
            const firebaseUsers: User[] = Object.values(data.users); // Convert object values to an array
            localStorage.setItem('usersData', JSON.stringify(firebaseUsers));
            this.store.dispatch(updateUsers({ users: firebaseUsers }));

            const matchingFirebaseUser = firebaseUsers.find(
              (user) => user.email === email && user.password === password
            );

            if (matchingFirebaseUser) {
              //finding the userkey for put the data userkey as used used path
              this.userKey = Object.keys(data.users).find(
                (key) =>
                  data.users[key].email === email &&
                  data.users[key].password === password
              );
              //checking user key getting or not
              if (this.userKey) {
                localStorage.setItem('userkey', this.userKey);
              }

              localStorage.setItem(
                'user',
                JSON.stringify(matchingFirebaseUser)
              );

              this.userDataService.setUserData(matchingFirebaseUser);
              // update state for activeUser
              this.store.dispatch(
                updateActiveUser({ user: matchingFirebaseUser })
              );

              this.isAuthenticatedValue = true; // Set the user as authenticated
              this.updateLoginStatus(true); // Update the login status
              // Store authentication status in localStorage
              this.storeAuthenticationStatus(true);

              return true; // Successful login
            }
          }

          // Failed login
          return false;
        }),
        catchError((error) => {
          console.error('Error fetching Firebase data:', error);
          return of(false); // Failed login
        })
      );
  }

  // Method to perform user logout
  logout(): void {
    this.isAuthenticatedValue = false; // Set the user as not authenticated
    this.updateLoginStatus(false);

    // Remove authentication status from localStorage
    this.storeAuthenticationStatus(false);
    //remove user info in localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('userkey');
  }

  ngOnDestroy(): void {
    this.activeUserSubscription?.unsubscribe();
  }
  private checkAuthenticationStatus(): boolean {
    // Check if authentication status is stored in localStorage
    const storedStatus = localStorage.getItem('authenticationStatus');
    return storedStatus === 'true';
  }

  private storeAuthenticationStatus(status: boolean) {
    // Store authentication status in localStorage
    localStorage.setItem('authenticationStatus', status.toString());
  }
}
