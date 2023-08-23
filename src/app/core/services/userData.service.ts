// user-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userDataSubject = new BehaviorSubject<User | null>(null);
  userData$: Observable<User | null> = this.userDataSubject.asObservable();

  setUserData(user: User) {
    this.userDataSubject.next(user);
  }
}
