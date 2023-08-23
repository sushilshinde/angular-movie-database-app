import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      // User is not authenticated, allow access
      return true;
    } else {
      // User is authenticated, redirect to another route
      this.router.navigate(['/home']);
      return false;
    }
  }
}
