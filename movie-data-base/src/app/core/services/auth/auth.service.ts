import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginSatus=new BehaviorSubject<boolean>(false)
  public loginInfo$=this.loginSatus.asObservable()
  private isAuthenticatedValue: boolean = false;
  usersData: string[] = [];

  constructor(private http: HttpClient) {}

  updateLoginStatus(status:boolean){
    this.loginSatus.next(status)
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedValue;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any>('../../../../assets/auth/users.json').pipe(
      map((data) => {
        const matchingUsers = data.users.filter(
          (user: any) => user.email === email && user.password === password
        );
        
        if (matchingUsers.length > 0) {
          this.isAuthenticatedValue = true;
          return true;
        }
        
        return false;
      })
    );
  }
  

  logout(): void {
    this.isAuthenticatedValue = false;
  }
}
