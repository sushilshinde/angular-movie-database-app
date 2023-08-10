import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;

  username: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private signupService: SignupService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signup(): void {
    if (this.signupForm.valid) {
      const username = this.signupForm.value.username;
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;
      this.signupService
        .signup(username, email, password)
        .subscribe((success) => {
          if (success) {
            this.router.navigate(['/login']);
          } else {
            // Show an error message indicating that the username or email already exists
            alert('Email already exits ');
          }
        });
    }
  }
}
