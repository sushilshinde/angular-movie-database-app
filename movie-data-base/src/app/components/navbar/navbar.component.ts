import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../core/interface/user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userLoginStatus?: boolean;
  loginUserDetails: any = null;

  constructor(private authservice: AuthService) {
    // Subscribe to the loginInfo$ observable from the AuthService to get the user login status.
    // Whenever the login status changes, the value will be updated in this.userLoginStatus.
    this.authservice.loginInfo$.subscribe((status) => {
      this.userLoginStatus = status;
      if (status) {
        const userinfo = localStorage.getItem('user');
        if (userinfo) {
          this.loginUserDetails = JSON.parse(userinfo);
          console.log('user', this.loginUserDetails);
        }
      }
    });

    // Initially, the userLoginStatus is undefined until the first value is emitted by the loginInfo$ observable.
    // This console.log will show "undefined" in the console.
    console.log(this.userLoginStatus);
  }

  ngOnInit() {
    // The ngOnInit lifecycle hook is called when the component is initialized.
    // We can perform any necessary setup or actions here.
  }

  // Function to handle the user logout process.
  logout() {
    // Show an alert indicating successful logout.
    alert('Successfully logged out');

    // Call the updateLoginStatus function from the AuthService to update the login status to false.
    // This will trigger the userLoginStatus change in the whole application due to the subscription in the constructor.
    this.authservice.updateLoginStatus(false);

    //removing the user data in local storage with name 'user'
    localStorage.removeItem('user');
  }
}
