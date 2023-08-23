import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interface/user.interface';
import { UserDataService } from 'src/app/core/services/userData.service';
import { Store } from '@ngrx/store';
import { removeActiveUser } from 'src/app/core/actions/user.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  userLoginStatus?: boolean;
  userData: User | null = null;
  loginInfoSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userDataService: UserDataService,
    private store: Store
  ) {}

  ngOnInit() {
    // Subscribe to user data changes
    this.userDataService.userData$.subscribe((userData) => {
      this.userData = userData;
    });
    // Subscribe to the loginInfo$ observable from the AuthService to get the user login status.
    this.loginInfoSubscription = this.authService.loginInfo$.subscribe(
      (status) => {
        this.userLoginStatus = status;
      }
    );
    const storedUser = localStorage.getItem('authenticationStatus');
    if (storedUser === 'true') {
      this.userLoginStatus = true;
    } else {
      this.userLoginStatus = false;
    }
  }

  // Function to handle the user logout process.
  logout() {
    // Show an alert indicating successful logout.
    alert('Successfully logged out');
    //remove active user info in ngrx store
    this.store.dispatch(removeActiveUser());

    this.authService.logout();
    // Redirect to home page after logout if any service use remove
    this.router.navigate(['/home']);

    // Call the updateLoginStatus function from the AuthService to update the login status to false.
    // This will trigger the userLoginStatus change in the whole application due to the subscription in the constructor.
    this.authService.updateLoginStatus(false);
  }

  ngOnDestroy() {
    // Unsubscribe from the loginInfo$ observable when the component is destroyed to prevent memory leaks.
    if (this.loginInfoSubscription) {
      this.loginInfoSubscription.unsubscribe();
    }
  }
}
