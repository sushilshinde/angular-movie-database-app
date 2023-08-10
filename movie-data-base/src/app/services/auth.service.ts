import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginSatus = new BehaviorSubject<boolean>(false);
  public loginInfo$ = this.loginSatus.asObservable();
  private isAuthenticatedValue: boolean = false;

  usersData: string[] = [];

  initialUserData: User[] = [];

  constructor(private http: HttpClient) {
    const dataString = localStorage.getItem('usersData');
    if (dataString) {
      this.initialUserData = JSON.parse(dataString);
    }
    console.log();
  }

  updateLoginStatus(status: boolean) {
    this.loginSatus.next(status);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedValue;
  }

  login(email: string, password: string): Observable<boolean> {
    const matchingUsers = this.initialUserData.filter(
      (user) => user.email === email && user.password === password
    );

    if (matchingUsers.length > 0) {
      this.isAuthenticatedValue = true;
      this.updateLoginStatus(true);
      return new Observable<boolean>((observer) => {
        observer.next(true);
        observer.complete();
      });
    }

    return new Observable<boolean>((observer) => {
      observer.next(false);
      observer.complete();
    });
  }

  logout(): void {
    this.isAuthenticatedValue = false;
  }
}
