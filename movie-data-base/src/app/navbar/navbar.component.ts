import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userLoginStatus?: boolean;

  constructor(private authservice: AuthService) {
    this.authservice.loginInfo$.subscribe((status) => {
      this.userLoginStatus = status;
    });
    console.log(this.userLoginStatus);
  }

  ngOnInit() {}
  logout() {
    alert('successfully Logout');
    this.authservice.updateLoginStatus(false);
  }
}
