import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginStatus = new BehaviorSubject<boolean>(false);
  public loginInfo$ = this.loginStatus.asObservable(); // Observable to track login status changes
  private isAuthenticatedValue: boolean = false; // Indicates if the user is authenticated or not

  initialUserData: User[] = []; // Array to store user data initially fetched from local storage

  // Constructor - commented out for future reference

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
    const matchingUsers = this.initialUserData.filter(
      (user) => user.email === email && user.password === password
    );

    if (matchingUsers.length > 0) {
      //save the user data in local storage in name "user"
      localStorage.setItem('user', JSON.stringify(matchingUsers[0]));
      this.isAuthenticatedValue = true; // Set the user as authenticated
      this.updateLoginStatus(true); // Update the login status
      return new Observable<boolean>((observer) => {
        observer.next(true); // Notify the observer with successful login
        observer.complete();
      });
    }

    return new Observable<boolean>((observer) => {
      observer.next(false); // Notify the observer with failed login attempt
      observer.complete();
    });
  }

  // Method to perform user logout
  logout(): void {
    this.isAuthenticatedValue = false; // Set the user as not authenticated
  }

  // Method to get login user data from local storage
  getLoginUserData() {
    const dataString = localStorage.getItem('usersData');
    if (dataString) {
      this.initialUserData = JSON.parse(dataString); // Parse and store user data from local storage
    }
  }
}
