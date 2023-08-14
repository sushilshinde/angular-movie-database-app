import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
        console.log(this.authService.isActiveUser())
    if (this.authService.isActiveUser()) {
      return true;
    }
    this.snackbar.open('Please login to continue...!', 'OK!', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });

    this.router.navigate(['/login']);
    return false;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isActiveUser()) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
