import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  email: string = '';
  password: string = '';

  ErrorMessage: string = '';

  constructor(
    private authservice: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    //creating the fromBuilder with  credentials and initial values with validators
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  //passing the login information to the services with email,and password
  login(): void {
    //if from is validate after pass credentials
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.authservice.login(email, password).subscribe((isAuthenticate) => {
        //if user is authenticate redirect to home page
        console.log('logincheck', isAuthenticate);
        if (isAuthenticate) {
          this.authservice.updateLoginStatus(true);
          this.router.navigate(['/home']);
        } else {
          //any error show the error message
          this.ErrorMessage = 'Invalid email or password.';
        }
      });
    }
  }
}
