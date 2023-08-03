import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) {}
  signup(
    username: string,
    email: string,
    password: string
  ): Observable<boolean> {
    return this.http.get<any>('../../../../assets/auth/users.json').pipe(
      map((data) => {
        if (!data.users.some((user: any) => user.email === email)) {
          data.users.push({ username, email, password });
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
