import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { updateUsers } from '../../actions/user.actions';
import { User } from '../../interface/user.interface';
@Injectable({
  providedIn: 'root',
})
export class SignupService implements OnDestroy {
  private subscription?: Subscription;

  constructor(private http: HttpClient, private store: Store) {}

  // Function to handle signup attempt
  signup(
    username: string,
    email: string,
    password: string
  ): Observable<boolean> {
    // Check if the user with the provided email already exists in Firebase
    return this.checkUserExists(email).pipe(
      switchMap((exists) => {
        if (!exists) {
          const newUser = {
            username,
            email,
            password,
          };

          // Send a POST request to add the new user data to the Firebase database
          return this.http.post(
            'https://udemy-section-18-default-rtdb.firebaseio.com/users.json',
            newUser
          );
        } else {
          // If the email is already present, return an Observable with 'false' to indicate a failed signup
          return of(false);
        }
      }),
      switchMap((response) => {
        if (response === false) {
          // If the signup failed (email already exists or an error occurred), return false
          return of(false);
        } else {
          // If the signup was successful, update the users store with the new user data
          return this.updateUsersStore(response);
        }
      }),
      catchError((error) => {
        console.error('Error checking user existence:', error);
        return of(false);
      })
    );
  }

  // Function to check if a user with the provided email exists in Firebase
  private checkUserExists(email: string): Observable<boolean> {
    return this.http
      .get<{ [key: string]: User }>(
        'https://udemy-section-18-default-rtdb.firebaseio.com/users.json'
      )
      .pipe(
        map((data) => {
          if (!data) {
            // If there's no user data, the user does not exist
            return false;
          }

          // Check if any user has the provided email
          return Object.values(data).some((user) => user.email === email);
        })
      );
  }

  // Function to update the users store with new user data
  private updateUsersStore(userData: any): Observable<boolean> {
    // Update the users store with the new user data (you should define your updateUsers action)
    this.store.dispatch(updateUsers({ users: userData }));
    return of(true);
  }

  // Unsubscribe the initial data retrieval subscription to prevent memory leaks
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
