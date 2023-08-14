import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
class DummyComponent{} //testing the route
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([
            { path: 'home', component: DummyComponent } 
          ])],
        providers: [
          {
            provide: AuthService,
            useValue: {
              login: jasmine.createSpy('login').and.returnValue(of(true)),
              updateLoginStatus: jasmine.createSpy('updateLoginStatus'),
              getLoginUserData: jasmine.createSpy('getLoginUserData')
            }
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method on form submission with valid credentials', () => {
    const email = 'venki@gmail.com';
    const password = 'user1234';

    component.loginForm.setValue({ email, password });
    component.loginForm.markAllAsTouched();

    const loginSpy = authService.login as jasmine.Spy;
    loginSpy.and.returnValue(of(true));

    component.login();

    expect(loginSpy).toHaveBeenCalledWith(email, password);
    expect(authService.updateLoginStatus).toHaveBeenCalledWith(true);
    // You can add more expectations based on the behavior you expect after successful login.
  });

  it('should display an error message on form submission with invalid credentials', () => {
    const email = 'invalid@example.com';
    const password = 'invalidpass';

    component.loginForm.setValue({ email, password });
    component.loginForm.markAllAsTouched();

    const loginSpy = authService.login as jasmine.Spy;
    loginSpy.and.returnValue(of(false));

    component.login();

    expect(component.ErrorMessage).toBe('Invalid email or password.');
    expect(authService.updateLoginStatus).not.toHaveBeenCalled();
   
  });

  
});
