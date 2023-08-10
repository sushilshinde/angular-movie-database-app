import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user.modal';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  usersInitialData: User[] = []; // Array to store initial user details from getting http json file

  constructor(private http: HttpClient) {
    // Using HttpClient to get user data from a JSON file
    this.http
      .get<{ users: User[] }>('../../../../assets/auth/users.json')
      .subscribe({
        // If the HTTP request is successful, store the user data in usersInitialData using the User model
        next: (data) => {
          this.usersInitialData = data.users;
        },
        // If there's an error in the HTTP request, show an alert
        error: (error) => {
          alert(error);
        },
      });
  }

  // Function to handle signup attempt, passing the credentials to login
  signup(
    username: string,
    email: string,
    password: string
  ): Observable<boolean> {
    // Check if the email is not already present in the usersInitialData array
    if (!this.usersInitialData.some((user: User) => user.email === email)) {
      // If the email is not already present, add the new user to the usersInitialData array
      this.usersInitialData.push({ username, email, password });

      //passing the updated user details array passing to storeDataInLocalStorage
      this.storeDataInlocalStorage(this.usersInitialData);

      // Return an Observable with 'true' to indicate successful signup
      return new Observable((observer) => {
        observer.next(true);
        observer.complete();
      });
    } else {
      // If the email is already present, return an Observable with 'false' to indicate failed signup
      return new Observable((observer) => {
        observer.next(false);
        observer.complete();
      });
    }
  }
  storeDataInlocalStorage(data: User[]) {
    // Store the updated users data in localStorage as a JSON string this used instance of api post method
    localStorage.setItem('usersData', JSON.stringify(data));
  }
}
