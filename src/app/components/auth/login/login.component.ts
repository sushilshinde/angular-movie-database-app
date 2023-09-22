/**
 * File: login.component.ts
 * Author: Venkateswara Rao samineni
 * Description: This Angular component handles the user login functionality.
 */

// Import necessary Angular modules and services
import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // Declare variables
  loginForm: FormGroup;
  email: string = '';
  password: string = '';
  ErrorMessage: string = '';

  constructor(
    private authservice: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // Create a form group with email and password fields and add validators
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // Function to handle user login
  login(): void {
    // Check if the form is valid before sending credentials
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      // Call the AuthService's login method with email and password
      this.authservice.login(email, password).subscribe((isAuthenticate) => {
        // If user is authenticated, redirect to the home page
        console.log('logincheck', isAuthenticate);
        if (isAuthenticate) {
          this.authservice.updateLoginStatus(true);
          this.router.navigate(['/home']);
        } else {
          // If there is an error, show the error message
          this.ErrorMessage = 'Invalid email or password.';
        }
      });
    }
  }
}
