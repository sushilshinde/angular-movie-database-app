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
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    console.log('is triggerd');
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      console.log(this.authservice.login(email, password));
      this.authservice.login(email, password).subscribe((isAuthenticate) => {
        if (isAuthenticate) {
          console.log('is checked to navigate', isAuthenticate);
          this.authservice.updateLoginStatus(true);
          this.router.navigate(['/home']);
        } else {
          this.ErrorMessage = 'Invalid email or password.';
        }
      });
    }
  }
}
