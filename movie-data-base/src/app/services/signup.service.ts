import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  usersInitialData: User[] = [];

  constructor(private http: HttpClient) {
    this.http
      .get<{ users: User[] }>('../../../../assets/auth/users.json')
      .subscribe({
        next: (data) => {
          this.usersInitialData = data.users;
        },
        error: (error) => {
          alert(error);
        },
      });
  }

  signup(
    username: string,
    email: string,
    password: string
  ): Observable<boolean> {
    console.log('Beforeusers', this.usersInitialData);

    if (!this.usersInitialData.some((user: User) => user.email === email)) {
      this.usersInitialData.push({ username, email, password });

      localStorage.setItem('usersData', JSON.stringify(this.usersInitialData));
      console.log('After users', this.usersInitialData);
      return new Observable((observer) => {
        observer.next(true);
        observer.complete();
      });
    } else {
      return new Observable((observer) => {
        observer.next(false);
        observer.complete();
      });
    }
  }
}
