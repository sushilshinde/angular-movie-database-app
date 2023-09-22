import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NofoundComponent } from './nofound.component';
/*
 * File: nofound.component.html
 * Author: Venkateswara Rao samineni
 * Description: If no routing match show this componets with 404 message and button for back to home
 */
describe('NofoundComponent', () => {
  let component: NofoundComponent;
  let fixture: ComponentFixture<NofoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NofoundComponent],
    });

    fixture = TestBed.createComponent(NofoundComponent);
    component = fixture.componentInstance;
  });

  it('should create the NofoundComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display the "404 Not Found" message and a link to the home page', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    const notFoundMessage = compiled.querySelector('.not_found_message');
    expect(notFoundMessage.textContent).toContain(
      "Oops! We can't find the page you're looking for"
    );

    const returnToHomeLink = compiled.querySelector('.notFound_return_to_home');
    expect(returnToHomeLink.textContent).toContain('go to Home page');
    expect(returnToHomeLink.getAttribute('routerLink')).toBe('/home');
  });
});
